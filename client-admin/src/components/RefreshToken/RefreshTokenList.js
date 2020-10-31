import {List, Datagrid, EmailField, DateField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function RefreshTokenList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <ReferenceField label="User" source="user" reference="users">
                    <EmailField source="email" />
                </ReferenceField>
                <DateField source="issuedAt" showTime />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default RefreshTokenList;
