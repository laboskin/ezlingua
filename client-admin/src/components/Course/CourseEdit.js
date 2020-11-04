import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, required} from 'react-admin';

function CourseEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="name" validate={required()} />
                <ReferenceInput label="Source Language" source="sourceLanguage" reference="languages">
                    <SelectInput optionText="name" validate={required()}/>
                </ReferenceInput>
                <ReferenceInput label="Goal Language" source="goalLanguage" reference="languages">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default CourseEdit;
