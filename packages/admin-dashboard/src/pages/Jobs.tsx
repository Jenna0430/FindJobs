import {
  List, Datagrid, TextField, DateField, ChipField, FunctionField,
  EditButton, DeleteButton, SearchInput, SelectInput,
  CreateButton, FilterButton, TopToolbar,
  ReferenceField
} from "react-admin";
import { Typography, Box } from "@mui/material";

const jobFilters = [
  <SearchInput source="name@ilike" alwaysOn />,
  <SelectInput source="is_active" choices={[
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
        <TextField  source="id" />
        <TextField source="title"/>

        <ReferenceField source="job_id" reference="jobs" label="Company" link={false}>
        <FunctionField render={(job: any) => (
          <ReferenceField
            source="company_id"
            reference="companies"
            record={job}
            link={false}
          >
              <TextField source="name" />
              </ReferenceField>
            )} />
          </ReferenceField>

        <TextField source="type"/>
        <TextField source="description"/>
        <TextField source="location"/>
        <TextField source="salary"/>
        <ChipField source="is_active" label="status"/>
        <DateField source="created_at"  label="Created" />
        <EditButton   />
        <DeleteButton />
      </Datagrid>
    </List>
  </Box>
);

export default JobList;