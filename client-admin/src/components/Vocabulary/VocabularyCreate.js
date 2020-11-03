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
    ArrayInput
} from 'react-admin';

function VocabularyCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="vocabularyGroup" reference="vocabulary-groups">
                    <SelectInput optionText="name" />
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
                        <TextInput source="original" label="Original" />
                        <TextInput source="translation" label="Translation" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyCreate;
