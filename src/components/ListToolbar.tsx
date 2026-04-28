import { Box, Typography } from "@mui/material";
import { CreateButton, SearchInput, FilterButton } from "react-admin";

interface ListToolbarProps {
  title: string;
  filters: React.ReactElement[];
}

export const ListToolbar = ({ title, filters }: ListToolbarProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
    <Typography variant="h5" fontWeight={500}>{title}</Typography>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {filters}
      </Box>
      <CreateButton variant="contained" />
    </Box>
  </Box>
);