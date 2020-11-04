import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    ImageField,
    ImageInput,
    FormDataConsumer,
    required
} from 'react-admin';

function StoryEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <TextInput source="text" multiline validate={required()} />
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

export default StoryEdit;
