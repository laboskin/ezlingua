import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, DateTimeInput} from 'react-admin';

function RefreshTokenEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <ReferenceInput source="user" reference="users">
                    <SelectInput optionText="email" type="email" />
                </ReferenceInput>
                <TextInput source="refreshToken" />
                <DateTimeInput source="issuedAt" />
            </SimpleForm>
        </Edit>
    )
}

export default RefreshTokenEdit;
