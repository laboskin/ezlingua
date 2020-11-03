import {
    Edit,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
    ReferenceInput,
    BooleanInput,
    SimpleFormIterator,
    FormDataConsumer,
    ArrayInput,
    ReferenceArrayInput,
    SelectArrayInput,
    ChipField
} from 'react-admin';
import React from 'react';

function UserEdit(props) {

    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="email" type="email" />
                <PasswordInput source="password" />
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <BooleanInput source="isAdmin" />
                <ReferenceArrayInput reference="stories" source="stories">
                    <SelectArrayInput label="Stories">
                        <ChipField source="name" />
                    </SelectArrayInput>
                </ReferenceArrayInput>
                <ArrayInput source="words">
                    <SimpleFormIterator disableAdd >
                        <TextInput disabled source="original" label="Original" />
                        <TextInput disabled source="translation" label="Translation" />
                        <TextInput disabled source="course" label="Course" />
                        <FormDataConsumer>
                            {({ scopedFormData, getSource }) => scopedFormData.vocabulary &&
                                <TextInput disabled source={getSource('vocabulary')} label="Vocabulary" initialValue={scopedFormData.vocabulary} resettable/>}
                        </FormDataConsumer>
                        <BooleanInput source="trainingCards" label="Cards" />
                        <BooleanInput source="trainingConstructor" label="Constructor" />
                        <BooleanInput source="trainingListening" label="Listening" />
                        <BooleanInput source="trainingTranslationWord" label="TranslationWord" />
                        <BooleanInput source="trainingWordTranslation" label="WordTranslation" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit;
