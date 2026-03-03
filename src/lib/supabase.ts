import { createClient } from '@supabase/supabase-js';

// These are read from environment variables at build time
// Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in .env.local
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
