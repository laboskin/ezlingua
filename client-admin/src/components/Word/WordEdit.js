import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function WordEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="original" />
                <TextInput source="translation" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default WordEdit;
