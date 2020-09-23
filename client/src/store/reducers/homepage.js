import {
    HOMEPAGE_SET_COURSES,
    HOMEPAGE_SET_CURRENT_LANGUAGE,
    HOMEPAGE_SET_GOAL_LANGUAGES,
    HOMEPAGE_SET_SOURCE_LANGUAGES,
    HOMEPAGE_STOP_LOADING

} from '../actions/actionTypes';

const initialState = {
    loading: true,
    currentLanguage: null,
    courses: [],
    sourceLanguages: [],
    goalLanguages: []
}

export default function homepageReducer(state = initialState, action) {
    switch (action.type) {
        case HOMEPAGE_SET_COURSES:
            return {
                ...state,
                courses: action.courses
            }
        case HOMEPAGE_SET_SOURCE_LANGUAGES:
            return {
                ...state,
                sourceLanguages: action.languages
            }
        case HOMEPAGE_SET_GOAL_LANGUAGES:
            return {
                ...state,
                goalLanguages: action.languages
            }
        case HOMEPAGE_SET_CURRENT_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.language
            }
        case HOMEPAGE_STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}