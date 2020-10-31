import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, ImageField, ImageInput} from 'react-admin';

function StoryCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="text" multiline />
                <ImageInput source="image" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}

export default StoryCreate;
