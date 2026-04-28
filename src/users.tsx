import { List, DataTable, EmailField, UrlField } from "react-admin"

export const UserList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id"/>
            <DataTable.Col source="name"/>
            <DataTable.Col source="username"/>
            <DataTable.Col source="email">
                <EmailField source="email"/>
            </DataTable.Col>
            <DataTable.Col source="address.street"/>
            <DataTable.Col source="phone"/>    
            <DataTable.Col source="website" field={UrlField}/>    
            <DataTable.Col source="company.name"/>    
        </DataTable>
    </List>
)