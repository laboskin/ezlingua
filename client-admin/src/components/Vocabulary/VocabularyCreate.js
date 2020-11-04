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
    ArrayInput, required
} from 'react-admin';
import React from "react";

function VocabularyCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <ReferenceInput source="vocabularyGroup" reference="vocabulary-groups">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
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
                        <TextInput source="original" label="Original" validate={required()}  />
                        <TextInput source="translation" label="Translation" validate={required()}  />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyCreate;
