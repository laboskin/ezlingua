import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_START,
    TRAINING_NEXT_STEP,
    TRAINING_ANSWER_CORRECT,
    TRAINING_ANSWER_WRONG,
    TRAINING_COMPLETE,
    TRAINING_CLEAR


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

export function startTraining(trainingName, vocabularyId = null){
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request(`/api/training/${trainingName}/${vocabularyId || ''}`, 'GET', null, {}, token);
        if (response) {
            dispatch({
                type: TRAINING_START,
                words: response
            });
        }
    }
}
export function clearTraining() {
    return {
        type: TRAINING_CLEAR
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

