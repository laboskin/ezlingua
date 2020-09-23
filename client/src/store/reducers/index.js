import {combineReducers} from 'redux'
import modal from './modal';
import auth from './auth';
import homepage from './homepage';
export default combineReducers({
    auth,
    modal,
    homepage
})