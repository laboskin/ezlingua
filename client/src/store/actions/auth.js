import {
    LOGIN,
    LOGOUT
} from './actionTypes';

export function login(token) {
    return {
        type: LOGIN,
        token
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}