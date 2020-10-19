import {
    CONTENT_SET_ALL,
    CONTENT_SET_ONE,

} from './actionTypes';
import {request} from "../../utils/request";

export function loadContents() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/content/all/', 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: CONTENT_SET_ALL,
                payload: response
            })
        }
    }
}
export function clearContents() {
    return {
        type: CONTENT_SET_ALL,
    }
}

export function loadContent(contentId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/content/one/${contentId || ''}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: CONTENT_SET_ONE,
                payload: response
            });
        }
    }
}
export function clearContent() {
    return {
        type: CONTENT_SET_ALL,
    }
}