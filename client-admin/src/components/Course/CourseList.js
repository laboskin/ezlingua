import {List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function CourseList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <ReferenceField label="Source Language" source="sourceLanguage" reference="languages">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Goal Language" source="goalLanguage" reference="languages">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default CourseList;
