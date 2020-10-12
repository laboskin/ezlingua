import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_START,
    TRAINING_NEXT_STEP,
    TRAINING_ANSWER_CORRECT,
    TRAINING_ANSWER_WRONG,
    TRAINING_COMPLETE,
    TRAINING_CLEAR, TRAINING_ANSWER_MISTAKE, TRAINING_ANSWER_SKIP


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
export function answerMistake(option) {
    return {
        type: TRAINING_ANSWER_MISTAKE,
        option
    }
}
export function answerSkip() {
    return {
        type: TRAINING_ANSWER_SKIP,
    }
}
export function completeTraining(trainingName) {
    return async (dispatch, getState) => {
        const {auth: {token}, training: {words}} = getState();
        const answers = words.filter(word => word.correct).map(word => word.id);
        const response = await request(`/api/training/${trainingName}/`, 'POST', answers, {}, token);
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

export function selectOption(trainingName, option) {
    return (dispatch, getState) => {
        const {training: {words, step}} = getState();
        if (option === words[step-1][trainingName==='translation-word'?'original':'translation'])
            dispatch(answerCorrect());
        else {
            dispatch(answerMistake(option));
            dispatch(answerWrong());
        }
    }
}

