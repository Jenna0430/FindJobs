import {
  List, Datagrid, TextField, EmailField,
  EditButton, DeleteButton, SearchInput, SelectInput, FilterButton, TopToolbar, CreateButton
} from "react-admin";
import { Typography, Box } from "@mui/material";

const userFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput source="role" choices={[
    { id: "admin",  name: "Admin"  },
    { id: "user",   name: "User"   },
  ]} />,
];

const UserListActions = () => (
  <TopToolbar sx={{ alignItems: "center", gap: 1 }}>
    <FilterButton />
    <CreateButton variant="contained" />
  </TopToolbar>
);

const UserList = () => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h5" fontWeight={500} mb={2}>Users</Typography>
    <List
      filters={userFilters}
      actions={<UserListActions />}
      sx={{ "& .RaList-content": { boxShadow: "none", border: "0.5px solid", borderColor: "divider", borderRadius: 2 } }}
    >
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField  source="id"         />
        <TextField  source="first_name" label="First name" />
        <TextField  source="last_name"  label="Last name"  />
        <EmailField source="email"      />
        <TextField  source="role"       />
        <EditButton   />
        <DeleteButton />
      </Datagrid>
    </List>
  </Box>
);

export default UserList;