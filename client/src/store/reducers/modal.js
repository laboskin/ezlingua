import {
    MODAL_SHOW,
    MODAL_HIDE
} from '../actions/actionTypes';

const initialState = {
    visible: false,
    title: '',
    content: null
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_SHOW:
            return {
                visible: true,
                title: action.title,
                content: action.content
            }
        case MODAL_HIDE:
            return {
                visible: false,
                ...initialState
            }
        default:
            return state
    }
}