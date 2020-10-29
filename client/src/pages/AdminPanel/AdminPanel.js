import React from 'react';
import {fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';
import simpleRestProvider  from 'ra-data-simple-rest';
import {createBrowserHistory} from "history";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";

function AdminPanel() {
    const history = useHistory();
    const token = useSelector(state => state.user.token);

    const authProvider = {
        login: () => Promise.resolve(),
        checkAuth: () => Promise.resolve(),
        checkError: () => Promise.resolve(),
        getPermissions: () => Promise.resolve(),
        getIdentity: () => Promise.resolve(),
        logout: () => {
            history.push('/');
            return Promise.resolve();
        }
    }
    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        options.headers.set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    return (
        <Admin dataProvider={simpleRestProvider('/api/admin', httpClient)} authProvider={authProvider} history={createBrowserHistory({basename: '/admin/'})}>

        </Admin>
    )
}

export default AdminPanel;
