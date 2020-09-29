import {combineReducers} from 'redux'
import modal from './modal';
import auth from './auth';
import homepage from './homepage';
import user from './user';
import dictionary from './dictionary';
export default combineReducers({
    auth,
    modal,
    homepage,
    user,
    dictionary
})