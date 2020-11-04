import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, required} from 'react-admin';
import React from "react";

function WordEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="original" validate={required()} />
                <TextInput source="translation" validate={required()} />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default WordEdit;
