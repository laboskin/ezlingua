import {
    LOGIN,
    LOGOUT
} from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    token: null
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                token: action.token
            }
        case LOGOUT:
            return {
                isAuthenticated: false,
                token: null
            }
        default:
            return state
    }
}