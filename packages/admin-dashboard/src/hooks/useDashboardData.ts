import { Stats, TopJob } from "../types/dashboard.types";

export const useDashboardData = (_date: string) => {

  const stats: Stats = {
    users:     12480,
    jobs:      342,
    companies: 87,
  };

  const topJobs: TopJob[] = [
    { id: "1", title: "Software engineer",  post_count: 98 },
    { id: "2", title: "Product designer",   post_count: 74 },
    { id: "3", title: "Data analyst",       post_count: 61 },
    { id: "4", title: "Marketing manager",  post_count: 45 },
    { id: "5", title: "DevOps engineer",    post_count: 38 },
  ];

  const exportCSV = () => {
    const csv = `Metric,Value\nUsers,${stats.users}\nJobs,${stats.jobs}\nCompanies,${stats.companies}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "dashboard.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return { stats, topJobs, loading: false, error: null, exportCSV };
};