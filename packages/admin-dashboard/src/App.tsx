import { MyLayout } from "./layout/Layout"
import { Admin, Resource } from "react-admin";
import { Dashboard, JobList, UserList, CompanyList, ApplicationList, AdminLoginPage } from "./pages";
import { dataProvider } from "./provider/dataProvider";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import CompanyIcon from "@mui/icons-material/Business";
import { authProvider } from "./provider/authProvider";



export const App = () => 
(
    <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={AdminLoginPage} layout={MyLayout} requireAuth>
         <Resource name="dashboard" list={Dashboard}/>
         <Resource name="jobs" list={JobList} icon={WorkIcon} />
         <Resource name="companies" list={CompanyList} icon={CompanyIcon} />
         <Resource name="profiles" list={UserList} icon={GroupIcon} />
         <Resource name="applications" list={ApplicationList} icon={GroupIcon} />
    </Admin>
);
