import {List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton} from 'react-admin';

function WordList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="original" />
                <TextField source="translation" />
                <ReferenceField label="Course" source="course" reference="courses">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default WordList;
