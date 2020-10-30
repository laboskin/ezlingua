import {List, SimpleList, TextField, EditButton, DeleteButton} from 'react-admin';

function LanguageList(props) {
    return (
        <List {...props}>
            <SimpleList primaryText={record => record.name}
                        secondaryText={record => record.code}
                        tertiaryText={record => record.id}
                        linkType="edit"
                        leftAvatar={record => record.code} >
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="code" />
                <EditButton />
                <DeleteButton />

            </SimpleList>
        </List>
    )
}

export default LanguageList;
