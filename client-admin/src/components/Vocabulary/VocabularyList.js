import {List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function VocabularyList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <ReferenceField label="Course" source="course" reference="courses">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="VocabularyGroup" source="vocabularyGroup" reference="vocabulary-groups">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default VocabularyList;
