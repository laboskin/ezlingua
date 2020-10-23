import {
    STORIES_ADD_WORD, STORIES_CLEAR_STORY, STORIES_REMOVE_WORD,
    STORIES_SET_SELECTED_WORD,
    STORIES_SET_STORIES,
    STORIES_LOAD_STORY, STORIES_SET_TRANSLATIONS,
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
                type: STORIES_LOAD_STORY,
                payload: response
            });
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
        dispatch({
            type: STORIES_SET_SELECTED_WORD,
            sentencePosition,
            partPosition
        });
        const {auth: {token}, stories: {story}} = getState();
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
