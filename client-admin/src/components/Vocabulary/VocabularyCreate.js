import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    ImageField,
    ImageInput,
    FormDataConsumer,
    SimpleFormIterator,
    ArrayInput, required, minLength, maxLength
} from 'react-admin';
import React from "react";

function VocabularyCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <FormDataConsumer>
                    {({ formData }) => {
                        if (formData.course)
                            return (
                                <ReferenceInput source="vocabularyGroup"
                                                reference="vocabulary-groups"
                                                filter={{course: formData.course}}>
                                    <SelectInput optionText="name" validate={required()}  />
                                </ReferenceInput>
                            )
                        return null;
                    }}
                </FormDataConsumer>
                <ImageInput source="image" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <FormDataConsumer>
                    {({ formData, record }) => {
                        if (typeof formData.image === 'string' || !formData.image)
                            return (
                                <div className="RaFormInput-input-48">
                                    <img className="RaImageField-image-55" src={record.image} alt=""/>
                                </div>
                            )
                    }}
                </FormDataConsumer>
                <ArrayInput source="words">
                    <SimpleFormIterator>
                        <TextInput source="original" label="Original" validate={[required(), minLength(1), maxLength(50)]}  />
                        <TextInput source="translation" label="Translation" validate={[required(), minLength(1), maxLength(50)]}  />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyCreate;
