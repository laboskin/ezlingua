import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import LanguageList from "./components/Language/LanguageList";
import LanguageEdit from "./components/Language/LanguageEdit";
import LanguageCreate from "./components/Language/LanguageCreate";

function App() {

    // const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     options.headers.set('Authorization', `Bearer ${token}`);
//     return fetchUtils.fetchJson(url, options);
// };
    // const authProvider = {
    //     login: () => Promise.resolve(),
    //     checkAuth: () => Promise.resolve(),
    //     checkError: () => Promise.resolve(),
    //     getPermissions: () => Promise.resolve(),
    //     getIdentity: () => Promise.resolve(),
    //     logout: () => Promise.resolve(),
    // }

    return (
        <Admin dataProvider={simpleRestProvider('/api/admin')}>
            <Resource name="courses" list={ListGuesser} edit={EditGuesser} />
            <Resource name="languages" list={LanguageList} edit={LanguageEdit} create={LanguageCreate}/>
            <Resource name="refresh-tokens" list={ListGuesser} edit={EditGuesser} />
            <Resource name="stories" list={ListGuesser} edit={EditGuesser} />
            <Resource name="users" list={ListGuesser} edit={EditGuesser} />
            <Resource name="vocabularies" list={ListGuesser} edit={EditGuesser} />
            <Resource name="vocabulary-groups" list={ListGuesser} edit={EditGuesser} />
            <Resource name="words" list={ListGuesser} edit={EditGuesser} />

        </Admin>
    );
}

export default App;
