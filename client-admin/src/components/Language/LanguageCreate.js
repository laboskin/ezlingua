import {Create, SimpleForm, TextInput, ImageInput, ImageField} from 'react-admin';

function LanguageCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" />
                <TextInput source="code" />
                <ImageInput source="image" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>

            </SimpleForm>
        </Create>
    )
}

export default LanguageCreate;
