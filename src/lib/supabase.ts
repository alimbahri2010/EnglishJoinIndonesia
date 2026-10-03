import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Check .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://nadbzzrfzcrqhkzbowbg.supabase.co',
  supabaseAnonKey || 'sb_publishable_p803el02SXhPzY2eHfW8YQ_DoGl2nl8',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
