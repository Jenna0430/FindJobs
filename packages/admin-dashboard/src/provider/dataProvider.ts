import { supabaseDataProvider } from "ra-supabase";

import supabase from "../../../../SupabaseClient";
 
// Attach the logged-in user's JWT to every request so RLS policies
// see auth.uid() correctly. Without this, all requests use the anon
// key and RLS will block admin-only reads/writes.
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { data: { session } } = await supabase.auth.getSession();
 
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session?.access_token ?? ""}`,
      "Content-Type": "application/json",
    },
  });
};

export const dataProvider = supabaseDataProvider({
  instanceUrl: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  httpClient: fetchWithAuth,
});