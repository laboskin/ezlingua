import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function WordCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="original" />
                <TextInput source="translation" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default WordCreate;
