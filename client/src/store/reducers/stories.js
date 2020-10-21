import {
    STORIES_SET_STORIES, STORIES_SET_STORY,
} from '../actions/actionTypes';

const initialState = {
    stories: null,
    story: null
}

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case STORIES_SET_STORIES:
            return {
                ...state,
                all: action.payload
            }
        case STORIES_SET_STORY:
            return {
                ...state,
                one: action.payload
            }
        default:
            return state
    }
}