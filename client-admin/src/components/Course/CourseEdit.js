import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function CourseEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <ReferenceInput label="Source Language" source="sourceLanguage" reference="languages">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput label="Goal Language" source="goalLanguage" reference="languages">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default CourseEdit;
