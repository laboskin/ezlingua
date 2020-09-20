import {combineReducers} from 'redux'
import modal from './modal';
import auth from './auth'
export default combineReducers({
    auth,
    modal
})