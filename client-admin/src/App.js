import {Admin, Resource, fetchUtils, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import CourseList from "./components/Course/CourseList";
import CourseEdit from "./components/Course/CourseEdit";
import CourseCreate from "./components/Course/CourseCreate";
import LanguageList from "./components/Language/LanguageList";
import LanguageEdit from "./components/Language/LanguageEdit";
import LanguageCreate from "./components/Language/LanguageCreate";
import RefreshTokenList from "./components/RefreshToken/RefreshTokenList";
import RefreshTokenEdit from "./components/RefreshToken/RefreshTokenEdit";
import RefreshTokenCreate from "./components/RefreshToken/RefreshTokenCreate";
import StoryList from "./components/Story/StoryList";
import StoryEdit from "./components/Story/StoryEdit";
import StoryCreate from "./components/Story/StoryCreate";
import UserList from "./components/User/UserList";
import UserEdit from "./components/User/UserEdit";
import UserCreate from "./components/User/UserCreate";
import VocabularyList from "./components/Vocabulary/VocabularyList";
import VocabularyEdit from "./components/Vocabulary/VocabularyEdit";
import VocabularyCreate from "./components/Vocabulary/VocabularyCreate";
import VocabularyGroupsList from "./components/VocabularyGroup/VocabularyGroupList";
import VocabularyGroupEdit from "./components/VocabularyGroup/VocabularyGroupEdit";
import VocabularyGroupCreate from "./components/VocabularyGroup/VocabularyGroupCreate";
import WordsList from "./components/Word/WordList";
import WordEdit from "./components/Word/WordEdit";
import WordCreate from "./components/Word/WordCreate";

function App() {

    const convertFileToBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file.rawFile);
        });

    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        const token = localStorage.getItem('adminToken');
        options.headers.set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
    };
    const dataProvider = simpleRestProvider('/api/admin', httpClient);
    const myDataProvider = {
        ...dataProvider,
        update: (resource, params) => {
            if (params.data.image && (params.data.image.rawFile instanceof File)) {
                return convertFileToBase64(params.data.image)
                    .then(base64Picture => ({
                        src: base64Picture.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
                        ext: params.data.image.title.split('.').reverse()[0].toLowerCase(),
                    }))
                    .then(transformedImage =>
                        dataProvider.update(resource, {
                            ...params,
                            data: {
                                ...params.data,
                                image: transformedImage
                            }
                        })
                    );
            }
            return dataProvider.update(resource, params);
        },
        create: (resource, params) => {
            if (params.data.image && (params.data.image.rawFile instanceof File)) {
                return convertFileToBase64(params.data.image)
                    .then(base64Picture => ({
                        src: base64Picture.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
                        ext: params.data.image.title.split('.').reverse()[0].toLowerCase(),
                    }))
                    .then(transformedImage =>
                        dataProvider.create(resource, {
                            ...params,
                            data: {
                                ...params.data,
                                image: transformedImage
                            }
                        })
                    );
            }
            return dataProvider.create(resource, params);
        }
    };

    const authProvider = async (type, params) => {
        if (type === AUTH_LOGIN) {
            try {
                console.log(params);
                const {username: email, password} = params;
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                if (data && response.ok) {
                    localStorage.setItem('adminToken', data.accessToken);
                    return Promise.resolve();
                }
            } catch(e) {
                return Promise.reject(e.message);
            }
        }
        if (type === AUTH_LOGOUT) {
            localStorage.removeItem('adminToken');
            return Promise.resolve();
        }
        if (type === AUTH_ERROR) {
            const status  = params.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem('adminToken');
                return Promise.reject();
            }
            return Promise.resolve();
        }
        if (type === AUTH_CHECK) {
            return localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject();
        }
        return Promise.resolve();
    }

    return (
        <Admin dataProvider={myDataProvider} authProvider={authProvider}>
            <Resource name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate}/>
            <Resource name="languages" list={LanguageList} edit={LanguageEdit} create={LanguageCreate} />
            <Resource name="refresh-tokens" list={RefreshTokenList} edit={RefreshTokenEdit} create={RefreshTokenCreate} />
            <Resource name="stories" list={StoryList} edit={StoryEdit} create={StoryCreate} />
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
            <Resource name="vocabularies" list={VocabularyList} edit={VocabularyEdit} create={VocabularyCreate} />
            <Resource name="vocabulary-groups" list={VocabularyGroupsList} edit={VocabularyGroupEdit} create={VocabularyGroupCreate} />
            <Resource name="words" list={WordsList} edit={WordEdit} create={WordCreate} />
        </Admin>
    );
}

export default App;
