import {List, SimpleList} from 'react-admin';

function LanguageList(props) {
    return (
        <List {...props}>
            <SimpleList primaryText={record => record.name}
                        secondaryText={record => record.code}
                        linkType="edit"
                        leftAvatar={record => record.code} />
        </List>
    )
}

export default LanguageList;
