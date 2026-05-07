import { supabaseDataProvider } from "ra-supabase";
import { createClient } from "@supabase/supabase-js";

// supabase client instance for the admin app
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


export const dataProvider = supabaseDataProvider({
  instanceUrl:    import.meta.env.VITE_SUPABASE_URL,
  apiKey:         import.meta.env.VITE_SUPABASE_ANON_KEY,
  supabaseClient: supabase,
});

export const getDashboardStats = async () => {
  const [
    { count: totalJobs },
    { count: totalCompanies },
    { count: totalUsers },
    { count: totalApplications },
  ] = await Promise.all([
    supabase.from("jobs")        .select("*", { count: "exact", head: true }),
    supabase.from("companies")   .select("*", { count: "exact", head: true }),
    supabase.from("profiles")    .select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalJobs:           totalJobs         ?? 0,
    totalCompanies:      totalCompanies    ?? 0,
    totalUsers:          totalUsers        ?? 0,
    totalApplications:   totalApplications ?? 0,
  };
};

export const getTopJobs = async () => {
  // Top 5 jobs with the most applications
  const { data, error } = await supabase
    .from("applications")
    .select("job_id, jobs(id, title)")
    .not("job_id", "is", null);

  if (error) throw new Error(error.message);

  // Count applications per job_id manually
  const countMap: Record<string, { id: string; title: string; post_count: number }> = {};

  (data ?? []).forEach((app: any) => {
    const id    = app.job_id;
    const title = app.jobs?.title ?? "Unknown";
    if (!countMap[id]) countMap[id] = { id, title, post_count: 0 };
    countMap[id].post_count += 1;
  });

  // Sort by count descending and take top 5
  return Object.values(countMap)
    .sort((a, b) => b.post_count - a.post_count)
    .slice(0, 5);
};