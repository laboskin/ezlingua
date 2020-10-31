import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, ImageField, ImageInput, FormDataConsumer, ReferenceArrayInput, AutocompleteArrayInput } from 'react-admin';

function VocabularyEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
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
                <ReferenceArrayInput source="words" reference="words" label="Words">
                    <AutocompleteArrayInput
                        optionText={(record) => (
                        <span><strong>{record.original}</strong>&nbsp;&#8212;&nbsp;{record.translation}</span>
                    )}
                        matchSuggestion={(filter, choice) => {
                            return choice.original.toLowerCase().includes(filter.toLowerCase())
                                || choice.translation.toLowerCase().includes(filter.toLowerCase())
                        }}/>
                </ReferenceArrayInput>
            </SimpleForm>
        </Edit>
    )
}

export default VocabularyEdit;
