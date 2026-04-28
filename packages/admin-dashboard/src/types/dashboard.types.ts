export interface Stats {
  users: number;
  jobs: number;
  companies: number;
}

export interface TopJob {
  id: string;
  title: string;
  post_count: number;
}

export interface DashboardData {
  stats: Stats;
  topJobs: TopJob[];
}