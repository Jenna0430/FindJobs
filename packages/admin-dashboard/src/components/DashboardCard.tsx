import { Card, Box, Typography, CardContent } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface DashboardCardProps {
    icon: SvgIconComponent;
    label: string;
    value: string | number;
    delta?: string;
}

 export const DashboardCard = ({icon: Icon, label, value, delta }: DashboardCardProps) => {
    return (
    <Card sx={{ background: "var(--mui-palette-action-hover)", boxShadow: "none" }}>
        <CardContent>
        <Icon sx={{ fontSize: 20, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            {label}
        </Typography>
        <Typography variant="h5" fontWeight={500}>{value}</Typography>
        {delta && <Typography variant="caption" color="success.main">{delta}</Typography>}
        </CardContent>
  </Card>
    );
 }