import {
    DICTIONARY_SET_PROGRESS,
    DICTIONARY_SET_USER_VOCABULARIES,
    DICTIONARY_SET_VOCABULARY_GROUPS


} from '../actions/actionTypes';

const initialState = {
    userVocabularies: null,
    vocabularyGroups: null,
    progress: null
}

export default function dictionaryReducer(state = initialState, action) {
    switch (action.type) {
        case DICTIONARY_SET_USER_VOCABULARIES:
            return {
                ...state,
                userVocabularies: action.vocabularies
            }
        case DICTIONARY_SET_VOCABULARY_GROUPS:
            return {
                ...state,
                vocabularyGroups: action.vocabularyGroups
            }
        case DICTIONARY_SET_PROGRESS:
            return {
                ...state,
                progress: action.progress
            }
        default:
            return state
    }
}