import {Edit, SimpleForm, TextInput, ImageInput, ImageField, FormDataConsumer} from 'react-admin';

function LanguageEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="id" />
                <TextInput source="name" />
                <TextInput source="code" />
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
                    }
                    }
                </FormDataConsumer>

            </SimpleForm>
        </Edit>
    )
}

export default LanguageEdit;