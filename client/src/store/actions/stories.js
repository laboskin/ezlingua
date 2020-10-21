import {
    STORIES_SET_STORIES,
    STORIES_SET_STORY,
} from './actionTypes';
import {request} from "../../utils/request";

export function loadStories() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/stories/all/', 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: STORIES_SET_STORIES,
                payload: response
            })
        }
    }
}
export function clearStories() {
    return {
        type: STORIES_SET_STORIES,
    }
}

export function loadStory(storyId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/stories/${storyId || ''}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: STORIES_SET_STORY,
                payload: response
            });
        }
    }
}
export function clearStory() {
    return {
        type: STORIES_SET_STORY,
    }
}