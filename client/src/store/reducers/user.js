import {
    USER_AUTH_LOADED,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SET_COURSES,
    USER_HOMEPAGE_CHANGE_LANGUAGE,
    USER_HOMEPAGE_LOAD_COURSES,
} from '../actions/actionTypes';

const initialState = {
    isAuthLoading: true,
    isAuthenticated: false,
    isAdmin: null,
    token: null,
    email: null,
    name: null,
    courses: {
        currentCourse: null,
        userCourses: null,
        otherCourses: null
    },
    homepage: {
        currentLanguage: null,
        sourceLanguages: null,
        courses: null
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_AUTH_LOADED:
            return {
                ...state,
                isAuthLoading: false
            }
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: action.isAdmin,
                token: action.token,
                email: action.email,
                name: action.name,
                homepage: initialState.homepage
            }
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: initialState.isAuthenticated,
                isAdmin: initialState.isAdmin,
                token: initialState.token,
                email: initialState.email,
                name: initialState.email
            }
        case USER_SET_COURSES:
            return {
                ...state,
                courses: {
                    currentCourse: action.currentCourse,
                    userCourses: action.userCourses,
                    otherCourses: action.otherCourses
                }
            }
        case USER_HOMEPAGE_LOAD_COURSES:
            return {
                ...state,
                homepage: {
                    currentLanguage: action.currentLanguage,
                    sourceLanguages: action.sourceLanguages,
                    courses: action.courses
                }
            }
        case USER_HOMEPAGE_CHANGE_LANGUAGE:{
            return {
                ...state,
                homepage: {
                    ...state.homepage,
                    currentLanguage: action.language
                }
            }
        }
        default:
            return state
    }
}