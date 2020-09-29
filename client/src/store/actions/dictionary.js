import {
    DICTIONARY_SET_PROGRESS,
    DICTIONARY_SET_USER_VOCABULARIES,
    DICTIONARY_SET_VOCABULARY_GROUPS,
} from './actionTypes';
import {request} from "../../utils/request";

export function loadVocabularies() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('api/dictionary/all-vocabularies', 'GET', null, {}, token);
        dispatch(setUserVocabularies(response.userVocabularies));
        dispatch(setVocabularyGroups(response.vocabularyGroups));
    }
}
export function clearVocabularies() {
    return async (dispatch) => {
        dispatch(setUserVocabularies(null));
        dispatch(setVocabularyGroups(null));
    }
}
export function loadProgress() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('api/dictionary/user-progress', 'GET', null, {}, token);
        dispatch(setProgress(response));
    }
}
export function clearProgress() {
    return async (dispatch) => {
        dispatch(setProgress(null));
    }
}
export function setUserVocabularies(vocabularies) {
    return {
        type: DICTIONARY_SET_USER_VOCABULARIES,
        vocabularies
    }
}
export function setVocabularyGroups(vocabularyGroups) {
    return {
        type: DICTIONARY_SET_VOCABULARY_GROUPS,
        vocabularyGroups
    }
}
export function setProgress(progress) {
    return {
        type: DICTIONARY_SET_PROGRESS,
        progress
    }
}