import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function RefreshTokenCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="user" reference="users">
                    <SelectInput optionText="email" type="email" />
                </ReferenceInput>
                <TextInput source="refreshToken" />
            </SimpleForm>
        </Create>
    )
}

export default RefreshTokenCreate;
