import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required, minLength, maxLength} from 'react-admin';
import React from "react";

function VocabularyGroupCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={[required(), minLength(2), maxLength(50)]}  />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()}  />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyGroupCreate;
