import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function CourseCreate(props) {
    return (
        <Create {...props}>
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
        </Create>
    )
}

export default CourseCreate;
