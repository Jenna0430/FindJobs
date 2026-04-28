import { useState } from "react";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useDashboardData } from "../../hooks/useDashboardData";
import { lineData, barData, lineChartOptions, barChartOptions  } from "../../config/chartConfig";
import { DashboardToolBar } from "./DashboardToolBar";
import { DashboardCard } from "../../components/DashboardCard";
import { ChartCard } from "../../components/ChartCard";
import { TopJobsCard } from "../../components/TopJobsCard";

Chart.register(...registerables);

const Dashboard = () => {
  const [date, setDate]                    = useState("");
  const { stats, topJobs, loading, error, exportCSV } = useDashboardData(date);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error)   return <Alert severity="error">Failed to load dashboard data.</Alert>;

  return (
    <Box sx={{ marginTop: "40px", padding: "20px" }}>
      <DashboardToolBar onDateChange={setDate} onExport={exportCSV} />

      <Grid container spacing={1.5} columns={4}>

        <Grid size={1}><DashboardCard icon={PeopleIcon}      label="Total users"    value={stats.users ?? 80}     delta="+8.2% this month"  /></Grid>
        <Grid size={1}><DashboardCard icon={AttachMoneyIcon} label="Total revenue"  value="$94,200"         delta="+12.4% this month" /></Grid>
        <Grid size={1}><DashboardCard icon={WorkIcon}        label="Active jobs"    value={stats.jobs ?? 90}      delta="+3 today"          /></Grid>
        <Grid size={1}><DashboardCard icon={BusinessIcon}    label="Companies"      value={stats.companies ?? 90} delta="+2 this week"      /></Grid>

        <Grid size={3}>
          <ChartCard title="Monthly revenue">
            <Line data={lineData} options={lineChartOptions} />
          </ChartCard>
        </Grid>

        <Grid size={1} sx={{ gridRow: "span 2" }}>
          <TopJobsCard jobs={topJobs} />
        </Grid>

        <Grid size={3}>
          <ChartCard title="Applications per month">
            <Bar data={barData} options={barChartOptions} />
          </ChartCard>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;