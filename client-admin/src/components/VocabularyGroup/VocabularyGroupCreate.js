import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function VocabularyGroupCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyGroupCreate;
