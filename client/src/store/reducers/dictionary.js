import {
    DICTIONARY_SET_PROGRESS,
    DICTIONARY_SET_USER_VOCABULARY,
    DICTIONARY_SET_USER_WORDS,
    DICTIONARY_SET_VOCABULARIES,
    DICTIONARY_SET_VOCABULARY, DICTIONARY_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    updated: 0,
    userVocabularies: null,
    vocabularyGroups: null,
    progress: null,

    userVocabulary: null,
    userWords: null,
    vocabulary: null
}

export default function dictionaryReducer(state = initialState, action) {
    switch (action.type) {
        case DICTIONARY_UPDATE:
            return {
                ...state,
                updated: state.updated+1
            }
        case DICTIONARY_SET_VOCABULARIES:
            return {
                ...state,
                userVocabularies: action.userVocabularies || initialState.userVocabularies,
                vocabularyGroups: action.vocabularyGroups || initialState.vocabularyGroups
            }
        case DICTIONARY_SET_PROGRESS:
            return {
                ...state,
                progress: action.progress || initialState.progress
            }
        case DICTIONARY_SET_USER_VOCABULARY:
            return {
                ...state,
                userVocabulary: action.vocabulary || initialState.userVocabulary
            }
        case DICTIONARY_SET_USER_WORDS:
            return {
                ...state,
                userWords: action.words || initialState.userWords
            }
        case DICTIONARY_SET_VOCABULARY:
            return {
                ...state,
                vocabulary: action.vocabulary || initialState.vocabulary
            }
        default:
            return state
    }
}