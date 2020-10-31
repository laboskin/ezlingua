import {List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function VocabularyGroupsList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <ReferenceField label="Course" source="course" reference="courses">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default VocabularyGroupsList;
