import {Create, SimpleForm, TextInput, ImageInput, ImageField, required, minLength, maxLength} from 'react-admin';

function LanguageCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={required()} />
                <TextInput source="code" validate={[required(), minLength(2), maxLength(2)]} />
                <ImageInput source="image" accept="image/*"  validate={required()}>
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}

export default LanguageCreate;
