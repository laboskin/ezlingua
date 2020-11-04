import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, DateTimeInput, required} from 'react-admin';

function RefreshTokenEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <ReferenceInput source="user" reference="users" >
                    <SelectInput optionText="email" type="email"  validate={required()} />
                </ReferenceInput>
                <TextInput source="refreshToken"  validate={required()} />
                <DateTimeInput source="issuedAt"  validate={required()} />
            </SimpleForm>
        </Edit>
    )
}

export default RefreshTokenEdit;
