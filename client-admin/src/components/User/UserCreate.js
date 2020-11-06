import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    PasswordInput,
    BooleanInput,
    required,
    email, minLength, maxLength, regex
} from 'react-admin';

function UserCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="email" type="email" validate={[required(), email()]} />
                <PasswordInput source="password" validate={[required(), minLength(8), maxLength(50), regex(/^([A-Za-z0-9.$\\/[\]\-_@])/)]} />
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <BooleanInput source="isAdmin" />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate;
