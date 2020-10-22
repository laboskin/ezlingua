import {
    STORIES_SET_SELECTED_WORD,
    STORIES_SET_STORIES, STORIES_SET_STORY, STORIES_SET_TRANSLATIONS,
} from '../actions/actionTypes';

const initialState = {
    stories: null,
    story: null,
    selectedWord: {
        sentencePosition: null,
        partPosition: null
    },
    translations: null
}

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case STORIES_SET_STORIES:
            return {
                ...state,
                stories: action.payload
            }
        case STORIES_SET_STORY:
            return {
                ...state,
                story: action.payload
            }
        case STORIES_SET_SELECTED_WORD:
            return {
                ...state,
                selectedWord: {
                    sentencePosition: action.sentencePosition,
                    partPosition: action.partPosition
                }
            }
        case STORIES_SET_TRANSLATIONS:
            return {
                ...state,
                translations: action.translations
            }
        default:
            return state
    }
}