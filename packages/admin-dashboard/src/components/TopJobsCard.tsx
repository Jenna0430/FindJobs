import { Card, CardContent, Typography, Box } from "@mui/material";
import { TopJob } from "../types/dashboard.types";

interface TopJobsCardProps {
  jobs: TopJob[];
}

export const TopJobsCard = ({ jobs }: TopJobsCardProps) => (
  <Card variant="outlined" sx={{ height: "100%" }}>
    <CardContent>
      <Typography variant="caption" color="text.secondary" display="block" mb={2}>
        Top 5 jobs by posts
      </Typography>
      {jobs.map((job) => (
        <Box key={job.id} mb={1.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">{job.title}</Typography>
            <Typography variant="caption" color="text.secondary">{job.post_count}</Typography>
          </Box>
          <Box sx={{ background: "#eee", borderRadius: 1, height: 6, mt: 0.5 }}>
            <Box sx={{
              background: "#378ADD", height: 6, borderRadius: 1,
              width: `${(job.post_count / (jobs[0]?.post_count ?? 1)) * 100}%`
            }} />
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);