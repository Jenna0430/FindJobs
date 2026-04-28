import { Box, Typography, TextField, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DashboardToolBarProps {
    onDateChange: (date: string) => void;
    onExport: () => void;
}

export const DashboardToolBar = ( {onDateChange, onExport}: DashboardToolBarProps ) => (
    <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2
    }}>
        <Typography variant="h4" fontWeight="bold">
            Hello, Admin!
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
            <TextField 
            type="date"
            size="small"
            onChange={(e) => onDateChange(e.target.value)}
            />
            <Button 
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onExport}
            >
            Export
            </Button>

        </Box>
    </Box>
)