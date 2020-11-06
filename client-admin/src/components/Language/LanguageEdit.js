import {
    Edit,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    FormDataConsumer,
    required,
    minLength,
    maxLength
} from 'react-admin';

function LanguageEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="name" validate={[required(), minLength(2), maxLength(20)]} />
                <TextInput source="code" validate={[required(), minLength(2), maxLength(2)]} />
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
            </SimpleForm>
        </Edit>
    )
}

export default LanguageEdit;
