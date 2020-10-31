import {List, Datagrid, TextField, BooleanField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function UserList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="email" />
                <TextField source="name" />
                <ReferenceField label="Course" source="course" reference="courses">
                    <TextField source="name" />
                </ReferenceField>
                <BooleanField source="isAdmin" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default UserList;
