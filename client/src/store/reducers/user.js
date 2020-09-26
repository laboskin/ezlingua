import {
    USER_SET_CURRENT_COURSE, USER_SET_OTHER_COURSES, USER_SET_USER_COURSES

} from '../actions/actionTypes';

const initialState = {
    courses: {
        currentCourse: null,
        userCourses: [],
        otherCourses: []
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

        default:
            return state
    }
}