import {Create, SimpleForm, DateTimeInput, SelectInput, ReferenceInput, required} from 'react-admin';

function RefreshTokenCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <ReferenceInput source="user" reference="users">
                    <SelectInput optionText="email" type="email" validate={required()} />
                </ReferenceInput>
                <DateTimeInput source="issuedAt"  validate={required()}/>
            </SimpleForm>
        </Create>
    )
}

export default RefreshTokenCreate;
