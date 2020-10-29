import {combineReducers} from 'redux'
import modal from './modal';
import user from './user';
import dictionary from './dictionary';
import training from './training';
import stories from './stories';
import {adminReducer} from 'react-admin';
import {connectRouter} from 'connected-react-router';

const createRootReducer = history => combineReducers({
    modal,
    user,
    dictionary,
    training,
    stories,
    admin: adminReducer,
    router: connectRouter(history)
});

export default createRootReducer;