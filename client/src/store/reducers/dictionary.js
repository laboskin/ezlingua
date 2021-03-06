import {
    DICTIONARY_SET_FILTER_PROGRESS,
    DICTIONARY_SET_FILTER_TEXT, DICTIONARY_SET_FILTER_TRAINING,
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
    vocabulary: null,
    filters: {
        text: '',
        training: null,
        progress: null
    }
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
        case DICTIONARY_SET_FILTER_TEXT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: action.payload || initialState.filters.text
                }

            }
        case DICTIONARY_SET_FILTER_TRAINING:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    training: action.payload || initialState.filters.training
                }
            }
        case DICTIONARY_SET_FILTER_PROGRESS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    progress: action.payload || initialState.filters.progress
                }
            }
        default:
            return state
    }
}