import {
    MODAL_SHOW,
    MODAL_HIDE
} from './actionTypes'

export function showModal(title, content) {
    return {
        type: MODAL_SHOW,
        title,
        content
    }
}

export function hideModal() {
    return {
        type: MODAL_HIDE,
    }
}