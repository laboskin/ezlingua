import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required} from 'react-admin';
import React from "react";

function VocabularyGroupCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm onSubmit={() => {}}>
                <TextInput source="name" validate={required()}  />
                <ReferenceInput source="course" reference="courses">
                    <SelectInput optionText="name" validate={required()}  />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}

export default VocabularyGroupCreate;
