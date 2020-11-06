import {Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, required, minLength, maxLength} from 'react-admin';
import React from "react";

function VocabularyGroupEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput disabled source="id" />
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]}  />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()}  />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default VocabularyGroupEdit;
