import {
    USER_HOMEPAGE_CHANGE_LANGUAGE,
    USER_HOMEPAGE_LOAD_COURSES,
    USER_SET_CURRENT_COURSE, USER_SET_OTHER_COURSES, USER_SET_USER_COURSES

} from '../actions/actionTypes';

const initialState = {
    courses: {
        currentCourse: null,
        userCourses: [],
        otherCourses: []
    },
    homepage: {
        currentLanguage: null,
        sourceLanguages: null,
        courses: null
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_SET_CURRENT_COURSE:
            return {
                ...state,
                courses: {
                    ...state.courses,
                    currentCourse: action.course
                }
            }
        case USER_SET_USER_COURSES:
            return {
                ...state,
                courses: {
                    ...state.courses,
                    userCourses: action.courses
                }
            }
        case USER_SET_OTHER_COURSES:
            return {
                ...state,
                courses: {
                    ...state.courses,
                    otherCourses: action.courses
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