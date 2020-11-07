import {
    DICTIONARY_SET_FILTER_PROGRESS,
    DICTIONARY_SET_FILTER_TEXT, DICTIONARY_SET_FILTER_TRAINING,
    DICTIONARY_SET_PROGRESS, DICTIONARY_SET_USER_VOCABULARY, DICTIONARY_SET_USER_WORDS,
    DICTIONARY_SET_VOCABULARIES, DICTIONARY_SET_VOCABULARY, DICTIONARY_UPDATE,
} from './actionTypes';
import {request} from "../../utils/request";
import {logout} from "./user";

export function loadVocabularies() {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/dictionary/all-vocabularies', 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_SET_VOCABULARIES,
                    vocabularyGroups: response.vocabularyGroups,
                    userVocabularies: response.userVocabularies
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
export function clearVocabularies() {
    return {
        type: DICTIONARY_SET_VOCABULARIES
    }
}

export function loadProgress() {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/dictionary/user-progress', 'GET', null, {}, token);
            dispatch({
                type: DICTIONARY_SET_PROGRESS,
                progress: response
            });
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
export function clearProgress() {
    return {
        type: DICTIONARY_SET_PROGRESS
    }
}

export function loadUserWords() {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/dictionary/user-words', 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_SET_USER_WORDS,
                    words: response
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
export function clearUserWords() {
    return {
        type: DICTIONARY_SET_USER_WORDS
    }
}

export function loadUserVocabulary(id) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/user-vocabulary/${id}`, 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_SET_USER_VOCABULARY,
                    vocabulary: response
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
export function clearUserVocabulary() {
    return {
        type: DICTIONARY_SET_USER_VOCABULARY
    }
}

export function loadVocabulary(id) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/vocabulary/${id}`, 'GET', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_SET_VOCABULARY,
                    vocabulary: response
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
export function clearVocabulary() {
    return {
        type: DICTIONARY_SET_VOCABULARY
    }
}

export function learnVocabulary(vocabularyId) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/learn-vocabulary/${vocabularyId}`, 'POST', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_UPDATE
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
export function removeVocabulary(vocabularyId) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/remove-vocabulary/${vocabularyId}`, 'POST', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_UPDATE
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

export function learnWordFromVocabulary(wordId, vocabularyId) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/learn-word/${wordId}`, 'POST', {vocabulary: vocabularyId}, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_UPDATE
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
export function removeWord(wordId) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request(`/api/dictionary/remove-word/${wordId}`, 'POST', null, {}, token);
            if (response) {
                dispatch({
                    type: DICTIONARY_UPDATE
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


export function setFilterText(text) {
    return {
        type: DICTIONARY_SET_FILTER_TEXT,
        payload: text
    }
}
export function setFilterTraining(text) {
    return {
        type: DICTIONARY_SET_FILTER_TRAINING,
        payload: text
    }
}
export function setFilterProgress(progress) {
    return {
        type: DICTIONARY_SET_FILTER_PROGRESS,
        payload: progress
    }
}
export function clearFilters(){
    return dispatch => {
        dispatch({type: DICTIONARY_SET_FILTER_TEXT});
        dispatch({type: DICTIONARY_SET_FILTER_TRAINING});
        dispatch({type: DICTIONARY_SET_FILTER_PROGRESS});

    }
}

