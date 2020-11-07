import {
    STORIES_ADD_WORD, STORIES_CLEAR_STORY, STORIES_REMOVE_WORD,
    STORIES_SET_SELECTED_WORD,
    STORIES_SET_STORIES,
    STORIES_LOAD_STORY, STORIES_SET_TRANSLATIONS, STORIES_COMPLETE_STORY
} from './actionTypes';
import {request} from "../../utils/request";
import {logout} from "./user";

export function loadStories() {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/stories/all/', 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: STORIES_SET_STORIES,
                    payload: response
                })
            }
        } catch (e) {
            const status = e.message.split(' ')[0];
            if (status === '401') {
                dispatch(logout());
            } else {
                console.log(e);
            }
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
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/stories/${storyId || ''}`, 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: STORIES_LOAD_STORY,
                    payload: response
                });
            }
        } catch (e) {
            const status = e.message.split(' ')[0];
            if (status === '401') {
                dispatch(logout());
            } else {
                console.log(e);
            }
        }
    }
}
export function clearStory() {
    return {
        type: STORIES_CLEAR_STORY,
    }
}

export function selectWord(sentencePosition, partPosition) {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: STORIES_SET_SELECTED_WORD,
                sentencePosition,
                partPosition
            });
            const {user: {token}, stories: {story}} = getState();
            const response = await request('/api/stories/get-translations', 'POST', {
                text: story.sentences
                    .find(sentence => sentence.position === sentencePosition)
                    .parts
                    .find(part => part.position === partPosition)
                    .text,
                courseId: story.course
            }, {}, token);
            if (response) {
                dispatch({
                    type: STORIES_SET_TRANSLATIONS,
                    translations: response
                });
            }
        } catch (e) {
            const status = e.message.split(' ')[0];
            if (status === '401') {
                dispatch(logout());
            } else {
                console.log(e);
            }
        }
    }
}
export function unselectWord() {
    return async dispatch => {
        dispatch({
            type: STORIES_SET_TRANSLATIONS,
            translations: null
        });
        dispatch({
            type: STORIES_SET_SELECTED_WORD,
            sentencePosition: null,
            partPosition: null
        });
    }
}

export function addWord(original, translation) {
    return {
        type: STORIES_ADD_WORD,
        word: {
            original,
            translation
        }
    };
}
export function removeWord(original, translation) {
    return {
        type: STORIES_REMOVE_WORD,
        word: {
            original,
            translation
        }
    }
}

export function completeStory() {
    return async (dispatch, getState) => {
        const {user: {token}, stories: {story: {id: storyId}, addedWords}} = getState();
        const response = await request(`/api/stories/complete/${storyId || ''}`, 'POST', addedWords, {}, token);
        if (response) {
            dispatch({
                type: STORIES_COMPLETE_STORY
            });
        }
    }
}
