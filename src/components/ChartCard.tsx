import { Card, CardContent, Typography } from "@mui/material";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="caption" color="text.secondary" display="block" mb={1}>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);