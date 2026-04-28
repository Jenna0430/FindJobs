import {
  List, Datagrid, TextField, DateField, ChipField,
  EditButton, DeleteButton, SearchInput, SelectInput,
  CreateButton, FilterButton, TopToolbar
} from "react-admin";
import { Typography, Box } from "@mui/material";

const jobFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput source="status" choices={[
    { id: "open",   name: "Open"   },
    { id: "closed", name: "Closed" },
    { id: "draft",  name: "Draft"  },
  ]} />,
];

const JobListActions = () => (
  <TopToolbar sx={{ alignItems: "center", gap: 1 }}>
    <FilterButton />
    <CreateButton variant="contained" />
  </TopToolbar>
);

 const JobList = () => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h5" fontWeight={500} mb={2}>Jobs</Typography>
    <List
      filters={jobFilters}
      actions={<JobListActions />}
      empty={false} 
      sx={{ "& .RaList-content": { boxShadow: "none", border: "0.5px solid", borderColor: "divider", borderRadius: 2 } }}
    >
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="title"       />
        <TextField source="company"     />
        <ChipField source="status"      />
        <TextField source="post_count"  label="Posts" />
        <DateField source="created_at"  label="Created" />
        <EditButton   />
        <DeleteButton />
      </Datagrid>
    </List>
  </Box>
);

export default JobList;