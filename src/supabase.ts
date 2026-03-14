import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bvthbtrinfjzxjozeihd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dGhidHJpbmZqenhqb3plaWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5Njk1ODksImV4cCI6MjA4MTU0NTU4OX0.P6rMukdtzgDGwEyDVmiC7NGhFS5OuAlXr2Dm_zm5FzQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input, init) => fetch(input, init),
  },
});
