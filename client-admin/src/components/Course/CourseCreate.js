import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required, minLength, maxLength} from 'react-admin';

function CourseCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]} />
                <ReferenceInput label="Source Language" source="sourceLanguage" reference="languages">
                    <SelectInput optionText="name" validate={required()}/>
                </ReferenceInput>
                <ReferenceInput label="Goal Language" source="goalLanguage" reference="languages">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default CourseCreate;
