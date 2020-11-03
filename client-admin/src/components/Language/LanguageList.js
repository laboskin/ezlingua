import {Datagrid, DeleteButton, EditButton, List, TextField} from 'react-admin';

function LanguageList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <TextField source="code" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export default LanguageList;
