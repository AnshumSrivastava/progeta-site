/**
 * Auth Store — Svelte 5 runes-based auth state.
 */
import { supabase, isSupabaseConfigured } from '$lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { SelfOSMode } from '$lib/types';

class AuthStore {
    user = $state<User | null>(null);
    session = $state<Session | null>(null);
    loading = $state(true);
    mode = $state<SelfOSMode | null>(null);

    constructor() {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('selfos_mode') as SelfOSMode | null;
            this.mode = savedMode;
        }
    }

    async init() {
        if (!supabase || !isSupabaseConfigured) {
            this.loading = false;
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        this.session = session;
        this.user = session?.user ?? null;
        this.loading = false;

        supabase.auth.onAuthStateChange((_event, session) => {
            this.session = session;
            this.user = session?.user ?? null;
            if (session) {
                this.mode = 'cloud';
                if (typeof window !== 'undefined') {
                    localStorage.setItem('selfos_mode', 'cloud');
                }
            }
        });
    }

    setLocalMode() {
        this.mode = 'local';
        if (typeof window !== 'undefined') {
            localStorage.setItem('selfos_mode', 'local');
        }
    }

    async signIn(email: string, password: string) {
        if (!supabase) return { error: { message: 'Supabase not configured' } };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
            this.mode = 'cloud';
            if (typeof window !== 'undefined') {
                localStorage.setItem('selfos_mode', 'cloud');
            }
        }
        return { error };
    }

    async signUp(email: string, password: string) {
        if (!supabase) return { error: { message: 'Supabase not configured' }, data: null };
        return await supabase.auth.signUp({ email, password });
    }

    async sendMagicLink(email: string) {
        if (!supabase) return { error: { message: 'Supabase not configured' }, data: null };
        return await supabase.auth.signInWithOtp({ email });
    }

    async signOut() {
        if (supabase) {
            await supabase.auth.signOut();
        }
        this.user = null;
        this.session = null;
        this.mode = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('selfos_mode');
        }
    }
}

export const auth = new AuthStore();
