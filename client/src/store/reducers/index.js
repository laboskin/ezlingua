import {combineReducers} from 'redux'
import modal from './modal';
import user from './user';
import dictionary from './dictionary';
import training from './training';
import stories from './stories';

export default combineReducers({
    modal,
    user,
    dictionary,
    training,
    stories
})