import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required} from 'react-admin';

function WordCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="original" validate={required()} />
                <TextInput source="translation" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default WordCreate;
