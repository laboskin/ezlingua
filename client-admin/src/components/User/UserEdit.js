import {Edit, SimpleForm, TextInput, PasswordInput, SelectInput, ReferenceInput, BooleanInput} from 'react-admin';

function UserEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="email" type="email" />
                <PasswordInput source="password" />
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <BooleanInput source="isAdmin" />
                {/*<ArrayInput source="words">
                    <SimpleFormIterator>
                        <ReferenceInput source="model" reference="words" label="Word">
                            <SelectInput optionText={(record) => (
                                <span>
                                    <strong>{record.original}</strong>&nbsp;&#8212;&nbsp;{record.translation}
                                </span>
                            )} />
                        </ReferenceInput>
                        <ReferenceInput source="vocabulary" reference="vocabularies" label="Vocabulary">
                            <SelectInput optionText="name" allowEmpty />
                        </ReferenceInput>
                        <BooleanInput source="trainingCards" label="Cards" />
                        <BooleanInput source="trainingConstructor" label="Constructor" />
                        <BooleanInput source="trainingListening" label="Listening" />
                        <BooleanInput source="trainingTranslationWord" label="TranslationWord" />
                        <BooleanInput source="trainingWordTranslation" label="WordTranslation" />
                    </SimpleFormIterator>
                </ArrayInput>*/}
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit;
