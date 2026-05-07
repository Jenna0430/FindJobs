import { Card, CardContent, Typography, Box } from "@mui/material";
import { TopJob } from "../types/dashboard.types";

interface TopJobsCardProps {
  jobs: TopJob[];
}

export const TopJobsCard = ({ jobs }: TopJobsCardProps) => {
  const maxCount = Math.max(...jobs.map(j => j.post_count), 1); // ← safe max

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Top 5 jobs by applications
        </Typography>

        {jobs.length === 0 && (
          <Typography variant="caption" color="text.disabled">
            No applications yet.
          </Typography>
        )}

        {jobs.map((job) => {
          const pct = Math.round((job.post_count / maxCount) * 100);
          return (
            <Box key={job.id} mb={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" fontWeight={500}>{job.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {job.post_count} {job.post_count === 1 ? "application" : "applications"}
                </Typography>
              </Box>
              {/* Track */}
              <Box sx={{
                width: "100%",
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.200",
                overflow: "hidden",   // ← clips the fill bar
              }}>
                {/* Fill */}
                <Box sx={{
                  width:     `${pct}%`,
                  height:    "100%",
                  borderRadius: 4,
                  bgcolor:   "primary.main",
                  transition: "width 0.4s ease",  // ← smooth animation
                }} />
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};