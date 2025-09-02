import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(import.meta.env.VITE_DB_URL as string, import.meta.env.VITE_DB_PUBLIC_KEY as string)
// console.log(import.meta.env.VITE_DB_URL as string, import.meta.env.VITE_DB_PUBLIC_KEY as string)
// export const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')