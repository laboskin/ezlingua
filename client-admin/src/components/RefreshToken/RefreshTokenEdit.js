import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin';

function RefreshTokenEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="user" reference="users">
                    <SelectInput optionText="email" type="email" />
                </ReferenceInput>
                <TextInput source="refreshToken" />
            </SimpleForm>
        </Edit>
    )
}

export default RefreshTokenEdit;
