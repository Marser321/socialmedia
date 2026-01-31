import { createBrowserClient } from '@supabase/ssr';
import type { Lead } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

// Backend helper: add a new lead to Supabase
export async function addLead(lead: Lead) {
  const { data, error } = await supabase.from('leads').insert([lead]);
  return { data, error };
}
