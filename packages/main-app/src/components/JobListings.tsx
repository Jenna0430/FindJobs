
import JobListing from "./JobListing";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import type { JSX } from "react";
import type { Job } from "@findjobs/shared-ui";
import { useAuth } from "../context/AuthContext";
import { useJobListings } from "../hooks/generalHooks";
 
interface JobListingsProps {
  isHomePage?: boolean;
  /** When provided, skips internal fetching and renders this list directly. */
  jobs?: Job[];
  /** When provided alongside `jobs`, controls the loading state. */
  loading?: boolean;
}
 
function JobListings({ isHomePage = false, jobs: externalJobs, loading: externalLoading }: JobListingsProps): JSX.Element {
  const { role } = useAuth();
 
  // Only fetch internally when the parent hasn't supplied data
  const isControlled = externalJobs !== undefined;
  const { data: fetchedJobs = [], isLoading: fetchLoading, error } = useJobListings(
    isControlled ? false : isHomePage, // skip the home-page limit when controlled
    undefined,                          // no filters — parent owns them when controlled
    { enabled: !isControlled },         // skip the query entirely when controlled
  );
 
  const listJobs = isControlled ? externalJobs : fetchedJobs;
  const loading  = isControlled ? (externalLoading ?? false) : fetchLoading;
 
  return (
    <Box sx={{ padding: "10px 40px 60px", backgroundColor: "var(--primary-color-light)", color: "var(--text-color)" }}>
 
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1>{isHomePage ? "Recent Jobs" : "Browse Jobs"}</h1>
        <p>
          {role === "employer"
            ? "Manage your job postings and view applications."
            : "Explore our latest job openings and find your next career opportunity."}
        </p>
      </div>
 
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "40px", width: "100%" }}>
            <CircularProgress sx={{ color: "var(--primary-color)" }} />
          </Box>
 
        ) : !isControlled && error ? (
          // Only show fetch errors in self-fetching mode — in controlled mode
          // the parent is responsible for handling its own errors.
          <Box sx={{ textAlign: "center", width: "100%", padding: "40px" }}>
            <Typography color="error">
              {error instanceof Error ? error.message : "Failed to load jobs"}
            </Typography>
          </Box>
 
        ) : listJobs.length === 0 ? (
          <Box sx={{ textAlign: "center", width: "100%", padding: "40px" }}>
            <Typography>
              {role === "employer"
                ? "You have not posted any jobs yet."
                : "No jobs available at the moment."}
            </Typography>
          </Box>
 
        ) : (
          <>
            {listJobs.map((job) => (
              <Grid
                key={job.id}
                size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ width: "100%" }}>
                  <JobListing job={job} />
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
 
    </Box>
  );
}
 
export default JobListings;