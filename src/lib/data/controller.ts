/**
 * Data Controller — single interface for all read/write operations.
 * Determines whether to use local or Supabase based on current mode.
 */

import { localStore } from './local-adapter';
import { supabase } from '$lib/supabase';

type Source = 'ui' | 'voice' | 'agent' | 'import';

function getMode(): 'local' | 'cloud' | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('selfos_mode') as 'local' | 'cloud' | null;
}

function getUserId(): string | null {
    // Read from supabase session if available
    return null; // Will be populated from auth store
}

export class DataController {
    private userId: string | null = null;

    setUserId(id: string | null) {
        this.userId = id;
    }

    async read<T extends { id: string; updated_at?: string }>(domain: string, defaultValue: T[] = []): Promise<T[]> {
        const local = localStore<T[]>(domain, defaultValue);
        const localData = local.get();

        if (getMode() === 'cloud' && this.userId && supabase) {
            try {
                const { data, error } = await supabase
                    .from(domain)
                    .select('*')
                    .eq('user_id', this.userId)
                    .is('deleted_at', null)
                    .order('updated_at', { ascending: false });

                if (!error && data) {
                    const merged = mergeByUpdatedAt(localData, data as T[]);
                    local.set(merged);
                    return merged;
                }
            } catch {
                // Offline — return local data silently
            }
        }

        return localData;
    }

    async write<T extends { id: string; updated_at?: string }>(
        domain: string,
        record: T,
        source: Source = 'ui'
    ): Promise<void> {
        const local = localStore<T[]>(domain, []);
        const timestamp = new Date().toISOString();
        const withMeta = { ...record, updated_at: timestamp, source };

        // Write locally always — instant
        local.update(items => {
            const idx = items.findIndex(i => i.id === record.id);
            if (idx >= 0) {
                items[idx] = withMeta;
                return [...items];
            }
            return [...items, withMeta];
        });

        // Write to Supabase if cloud mode — background, non-blocking
        if (getMode() === 'cloud' && this.userId && supabase) {
            supabase
                .from(domain)
                .upsert({ ...withMeta, user_id: this.userId })
                .then(({ error }) => {
                    if (error) {
                        queueFailedWrite(domain, withMeta);
                    }
                });
        }
    }

    async softDelete(domain: string, id: string): Promise<void> {
        const local = localStore<Record<string, unknown>[]>(domain, []);
        const deletedAt = new Date().toISOString();

        local.update(items =>
            items.map(i => (i['id'] as string) === id ? { ...i, deleted_at: deletedAt } : i)
        );

        if (getMode() === 'cloud' && this.userId && supabase) {
            supabase
                .from(domain)
                .update({ deleted_at: deletedAt })
                .eq('id', id)
                .eq('user_id', this.userId);
        }
    }
}

function mergeByUpdatedAt<T extends { id: string; updated_at?: string }>(
    local: T[],
    remote: T[]
): T[] {
    const map = new Map<string, T>();
    [...local, ...remote].forEach(item => {
        const existing = map.get(item.id);
        if (!existing) {
            map.set(item.id, item);
        } else {
            const existingTime = new Date(existing.updated_at ?? '1970-01-01').getTime();
            const itemTime = new Date(item.updated_at ?? '1970-01-01').getTime();
            if (itemTime > existingTime) map.set(item.id, item);
        }
    });
    return Array.from(map.values());
}

function queueFailedWrite(domain: string, record: unknown) {
    const queue = JSON.parse(localStorage.getItem('selfos_sync_queue') ?? '[]');
    queue.push({ domain, record, queuedAt: new Date().toISOString() });
    localStorage.setItem('selfos_sync_queue', JSON.stringify(queue));
}

export const dataController = new DataController();
