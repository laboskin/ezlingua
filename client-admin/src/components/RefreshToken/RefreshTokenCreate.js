import {Create, SimpleForm, TextInput, DateTimeInput, SelectInput, ReferenceInput} from 'react-admin';

function RefreshTokenCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="user" reference="users">
                    <SelectInput optionText="email" type="email" />
                </ReferenceInput>
                <TextInput source="refreshToken" />
                <DateTimeInput source="issuedAt" />
            </SimpleForm>
        </Create>
    )
}

export default RefreshTokenCreate;
