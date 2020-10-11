import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_START_CARDS,
    TRAINING_START_CONSTRUCTOR,
    TRAINING_START_LISTENING,
    TRAINING_START_TRANSLATION_WORD, TRAINING_START_WORD_TRANSLATION

} from '../actions/actionTypes';

const initialState = {
    count: null,
    availableVocabularies: null
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case TRAINING_SET_COUNT:
            return {
                ...state,
                count: action.count || initialState.count
            }
        case TRAINING_SET_AVAILABLE_VOCABULARIES:
            return {
                ...state,
                availableVocabularies: action.vocabularies || initialState.availableVocabularies
            }
        case TRAINING_START_CARDS:
            return {
                ...state,
                words: action.words
            }
        case TRAINING_START_CONSTRUCTOR:
            return {
                ...state,
                words: action.words
            }
        case TRAINING_START_LISTENING:
            return {
                ...state,
                words: action.words
            }
        case TRAINING_START_TRANSLATION_WORD:
            return {
                ...state,
                words: action.words
            }
        case TRAINING_START_WORD_TRANSLATION:
            return {
                ...state,
                words: action.words
            }
        default:
            return state
    }
}