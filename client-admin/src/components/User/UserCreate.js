import {Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    PasswordInput,
    BooleanInput} from 'react-admin';

function UserCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="email" type="email" />
                <PasswordInput source="password" />
                <TextInput source="name" />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <BooleanInput source="isAdmin" />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate;
