import {
    DICTIONARY_SET_PROGRESS, DICTIONARY_SET_USER_VOCABULARY, DICTIONARY_SET_USER_WORDS,
    DICTIONARY_SET_VOCABULARIES, DICTIONARY_SET_VOCABULARY, DICTIONARY_UPDATE,
} from './actionTypes';
import {request} from "../../utils/request";

export function loadVocabularies() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/dictionary/all-vocabularies', 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_SET_VOCABULARIES,
                vocabularyGroups: response.vocabularyGroups,
                userVocabularies: response.userVocabularies
            })
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
        const {auth: {token}} = getState();
        const response = await request('/api/dictionary/user-progress', 'GET', null, {}, token);
        dispatch({
            type: DICTIONARY_SET_PROGRESS,
            progress: response
        });
    }
}
export function clearProgress() {
    return {
        type: DICTIONARY_SET_PROGRESS
    }
}

export function loadUserWords() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/dictionary/user-words', 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_SET_USER_WORDS,
                words: response
            });
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
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/user-vocabulary/${id}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_SET_USER_VOCABULARY,
                vocabulary: response
            });
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
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/vocabulary/${id}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_SET_VOCABULARY,
                vocabulary: response
            });
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
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/learn-vocabulary/${vocabularyId}`, 'POST', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_UPDATE
            });
        }
    }
}

export function removeVocabulary(vocabularyId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/remove-vocabulary/${vocabularyId}`, 'POST', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_UPDATE
            });
        }
    }
}

export function learnWordFromVocabulary(wordId, vocabularyId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/learn-word/${wordId}`, 'POST', {vocabulary: vocabularyId}, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_UPDATE
            });
        }
    }
}
export function removeWord(wordId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/dictionary/remove-word/${wordId}`, 'POST', null, {}, token);
        if (response) {
            dispatch({
                type: DICTIONARY_UPDATE
            });
        }
    }
}

