import {
    TRAINING_SET_AVAILABLE_VOCABULARIES,
    TRAINING_SET_COUNT,
    TRAINING_START,
    TRAINING_NEXT_STEP,
    TRAINING_ANSWER_CORRECT,
    TRAINING_ANSWER_WRONG,
    TRAINING_COMPLETE,
    TRAINING_CLEAR, TRAINING_ANSWER_MISTAKE, TRAINING_ANSWER_SKIP

} from '../actions/actionTypes';

const initialState = {
    count: null,
    availableVocabularies: null,
    words: null,
    step: null,
    isAnswered: null,
    isCompleted: null,
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
        case TRAINING_START:
            return {
                ...state,
                words: action.words,
                step: 1,
                isAnswered: false,
                isCompleted: false
            }
        case TRAINING_ANSWER_CORRECT:
            return {
                ...state,
                isAnswered: true,
                words: state.words.map((word, idx) => {
                    if (idx !== state.step -1)
                        return word;
                    return {
                        ...word,
                        correct: true
                    }
                })
            }
        case TRAINING_ANSWER_WRONG:
            return {
                ...state,
                isAnswered: true,
                words: state.words.map((word, idx) => {
                    if (idx !== state.step -1)
                        return word;
                    return {
                        ...word,
                        correct: false
                    }
                })
            }
        case TRAINING_ANSWER_MISTAKE:
            return {
                ...state,
                isAnswered: true,
                words: state.words.map((word, idx) => {
                    if (idx !== state.step -1)
                        return word;
                    return {
                        ...word,
                        correct: false,
                        mistake: action.option
                    }
                })
            }
        case TRAINING_ANSWER_SKIP:
            return {
                ...state,
                isAnswered: true,
                words: state.words.map((word, idx) => {
                    if (idx !== state.step -1)
                        return word;
                    return {
                        ...word,
                        correct: false
                    }
                })
            }
        case TRAINING_NEXT_STEP:
            return {
                ...state,
                step: state.step + 1,
                isAnswered: false
            }
        case TRAINING_COMPLETE:
            return {
                ...state,
                isCompleted: true
            }
        case TRAINING_CLEAR:
            return {
                ...initialState
            }
        default:
            return state
    }
}