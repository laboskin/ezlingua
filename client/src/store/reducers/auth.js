import {

} from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    token: null
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}