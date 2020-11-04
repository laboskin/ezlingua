import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    ImageField,
    ImageInput,
    required
} from 'react-admin';

function StoryCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <TextInput source="text" multiline validate={required()} />
                <ImageInput source="image" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}

export default StoryCreate;
