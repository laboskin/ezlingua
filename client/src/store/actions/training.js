import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_CARDS_START,
    TRAINING_CONSTRUCTOR_START,
    TRAINING_LISTENING_START,
    TRAINING_TRANSLATION_WORD_START,
    TRAINING_WORD_TRANSLATION_START,
    TRAINING_NEXT_STEP,
    TRAINING_ANSWER_CORRECT,
    TRAINING_ANSWER_WRONG, TRAINING_COMPLETE, TRAINING_CLEAR


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
        const response = await request(`/api/training/cards/${vocabularyId || ''}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_CARDS_START,
                words: response
            });
        }
    }
}
export function cardsKnow() {
    return answerCorrect();
}
export function cardsRepeat() {
    return answerWrong();
}
export function cardsForceRepeat() {
    return dispatch => {
        dispatch(cardsRepeat());
        dispatch(nextStep());
    }
}

export function loadConstructor(vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/constructor/${vocabularyId}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_CONSTRUCTOR_START,
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
                type: TRAINING_LISTENING_START,
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
                type: TRAINING_TRANSLATION_WORD_START,
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
                type: TRAINING_WORD_TRANSLATION_START,
                words: response
            });
        }
    }
}

export function nextStep(trainingName) {
    return (dispatch, getState) => {
        const {training: {words, step}} = getState();
        if(step === words.length)
            dispatch(completeTraining(trainingName));
        else
            dispatch({
                type: TRAINING_NEXT_STEP
            });
    }
}
export function answerCorrect() {
    return {
        type: TRAINING_ANSWER_CORRECT
    }
}
export function answerWrong() {
    return {
        type: TRAINING_ANSWER_WRONG
    }
}
export function completeTraining(trainingName) {
    return async (dispatch, getState) => {
        const {auth: {token}, training: {words}} = getState();
        const answers = words.filter(word => word.correct).map(word => word.id);
        const response = await request(`/api/training/${trainingName}/`, 'PUT', answers, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_COMPLETE
            });
        }
    }
}
export function clearTraining() {
    return {
        type: TRAINING_CLEAR
    }
}