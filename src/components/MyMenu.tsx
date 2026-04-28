import { Menu } from "react-admin";


export const MyMenu = () => (
    <Menu sx={{
        marginTop: "20px",
        padding: "18px",
        "& .RaMenu-root": {
            padding: "8px",
        },
        "& .RaMenuItemLink-root": {
            padding: "10px 16px",
            borderRadius: "8px",
            marginBottom: "4px",
        },
        "& .RaMenuItemLink-active": {
            backgroundColor: "#1976d2",
            color: "white",
            "& .MuiSvgIcon-root": {
                color: "white"
            }
        }
    }}>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="jobs" />
        <Menu.ResourceItem name="companies" />
        <Menu.ResourceItem name="profiles" />
        <Menu.ResourceItem name="applications" />
    </Menu>
)