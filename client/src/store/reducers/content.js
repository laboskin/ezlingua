import {
    CONTENT_SET_ALL, CONTENT_SET_ONE,
} from '../actions/actionTypes';

const initialState = {
    all: null,
    one: null
}

export default function dictionaryReducer(state = initialState, action) {
    switch (action.type) {
        case CONTENT_SET_ALL:
            return {
                ...state,
                all: action.payload
            }
        case CONTENT_SET_ONE:
            return {
                ...state,
                one: action.payload
            }
        default:
            return state
    }
}