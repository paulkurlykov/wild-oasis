import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://qorowfvltclkbddllypn.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcm93ZnZsdGNsa2JkZGxseXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMjE5MTAsImV4cCI6MjA0NDU5NzkxMH0.295tB7YS4D6GeuSvCFVietnhhUVESswIqYV_P9au-8k";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;