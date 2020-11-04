import {Admin, Resource} from 'react-admin';
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

    const dataProvider = simpleRestProvider('/api/admin');
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
        <Admin dataProvider={myDataProvider}>
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
