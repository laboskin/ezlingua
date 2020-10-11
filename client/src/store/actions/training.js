import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_START_CARDS,
    TRAINING_START_CONSTRUCTOR,
    TRAINING_START_LISTENING,
    TRAINING_START_TRANSLATION_WORD, TRAINING_START_WORD_TRANSLATION


} from './actionTypes';
import {request} from "../../utils/request";

export function loadCount(vocabularyId = null) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/words-count/${vocabularyId || ''}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_SET_COUNT,
                count: response
            })
        }
    }
}
export function clearCount() {
    return {
        type: TRAINING_SET_COUNT
    }
}

export function loadAvailableVocabularies(){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/training/available-vocabularies/', 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_SET_AVAILABLE_VOCABULARIES,
                vocabularies: response
            })
        }
    }
}
export function clearAvailableVocabularies(){
    return {
        type: TRAINING_SET_AVAILABLE_VOCABULARIES
    }
}

export function loadCards(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/cards/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START_CARDS,
                words: response
            });
        }
    }
}

export function loadConstructor(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/constructor/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START_CONSTRUCTOR,
                words: response
            });
        }
    }
}

export function loadListening(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/listening/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START_LISTENING,
                words: response
            });
        }
    }
}

export function loadTranslationWord(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/translation-word/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START_TRANSLATION_WORD,
                words: response
            });
        }
    }
}

export function loadWordTranslation(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/word-translation/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START_WORD_TRANSLATION,
                words: response
            });
        }
    }
}