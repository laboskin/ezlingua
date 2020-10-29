import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import {composeWithDevTools} from "redux-devtools-extension/index";
import {adminSaga} from 'react-admin';
import simpleRestProvider  from 'ra-data-simple-rest';
import {routerMiddleware, ConnectedRouter} from 'connected-react-router';
import createRootReducer from './store/reducers';
import './i18n/i18n';
import {createBrowserHistory} from "history";
import App from './App';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const saga = function* rootSaga() { yield all([adminSaga(simpleRestProvider(), () => Promise.resolve())].map(fork)); };

const store = createStore(createRootReducer(history), composeWithDevTools(
    applyMiddleware(
        thunk,
        sagaMiddleware,
        routerMiddleware(history),
    )
));

sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
