import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT

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
        default:
            return state
    }
}