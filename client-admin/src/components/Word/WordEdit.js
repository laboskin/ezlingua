import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, required, minLength, maxLength} from 'react-admin';

function WordEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="original" validate={[required(), minLength(1), maxLength(50)]} />
                <TextInput source="translation" validate={[required(), minLength(1), maxLength(50)]} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default WordEdit;
