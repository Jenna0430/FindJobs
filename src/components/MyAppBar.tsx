import { AppBar } from "react-admin";
import Box  from "@mui/material/Box";
import logo  from "../assets/logo.png";
import { Typography } from "@mui/material";


export const MyAppBar = () => (
    <AppBar sx={{
        color: "lightblue",
        padding: "10px"
    }}>
        <Box sx={{ display: "flex",
            alignItems: "center",
            gap: "20px"
        }}>
        <img src={logo} alt="logo" height={40} />
        <Typography variant="h6" color="inherit">
            FindJobs
        </Typography>
        </Box>
        <Box sx={{ flex: "1"}} />
        
    </AppBar>
);