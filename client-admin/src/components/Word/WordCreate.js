import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required, minLength, maxLength} from 'react-admin';

function WordCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="original" validate={[required(), minLength(1), maxLength(50)]} />
                <TextInput source="translation" validate={[required(), minLength(1), maxLength(50)]} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default WordCreate;
