import {combineReducers} from 'redux'
import modal from './modal';
import user from './user';
import dictionary from './dictionary';
import training from './training';
import stories from './stories';

const createRootReducer = () => combineReducers({
    modal,
    user,
    dictionary,
    training,
    stories
});

export default createRootReducer;