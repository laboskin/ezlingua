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
    ChipField, required, email, minLength, maxLength, regex
} from 'react-admin';
import React from 'react';

function UserEdit(props) {

    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="email" type="email" validate={[required(), email()]} />
                <PasswordInput source="password" validate={[minLength(8), maxLength(50), regex(/^([A-Za-z0-9.$\\/[\]\-_@])/)]} />
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
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
