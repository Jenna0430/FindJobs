import {
  List, Datagrid, TextField, UrlField,
  EditButton, DeleteButton, SearchInput, SelectInput,
  CreateButton, FilterButton, TopToolbar
} from "react-admin";
import { Typography, Box } from "@mui/material";

const companyFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput source="industry" choices={[
    { id: "tech",     name: "Tech"     },
    { id: "finance",  name: "Finance"  },
    { id: "health",   name: "Health"   },
    { id: "retail",   name: "Retail"   },
  ]} />,
];

const CompanyListActions = () => (
  <TopToolbar sx={{ alignItems: "center", gap: 1 }}>
    <FilterButton />
    <CreateButton variant="contained" />
  </TopToolbar>
);

const CompanyList = () => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h5" fontWeight={500} mb={2}>Companies</Typography>
    <List
      filters={companyFilters}
      actions={<CompanyListActions />}
      empty={false} 
      sx={{ "& .RaList-content": { boxShadow: "none", border: "0.5px solid", borderColor: "divider", borderRadius: 2 } }}
    >
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="name"      />
        <TextField source="industry"  />
        <TextField source="location"  />
        <UrlField  source="website"   />
        <TextField source="size"      label="Employees" />
        <EditButton   />
        <DeleteButton />
      </Datagrid>
    </List>
  </Box>
);

export default CompanyList;