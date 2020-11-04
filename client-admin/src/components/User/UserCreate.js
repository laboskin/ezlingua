import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    PasswordInput,
    BooleanInput,
    required,
    email
} from 'react-admin';

function UserCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="email" type="email" validate={[required(), email()]} />
                <PasswordInput source="password" validate={required()} />
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <BooleanInput source="isAdmin" />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate;
