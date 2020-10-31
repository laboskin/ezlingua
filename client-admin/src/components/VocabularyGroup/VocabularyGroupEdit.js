import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function VocabularyGroupEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default VocabularyGroupEdit;
