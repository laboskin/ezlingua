import {
    USER_AUTH_LOADED,
    USER_HOMEPAGE_CHANGE_LANGUAGE,
    USER_HOMEPAGE_LOAD_COURSES,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SET_COURSES,
} from './actionTypes';
import {request} from "../../utils/request";
import i18n from 'i18next';
import jwt_decode from "jwt-decode";

export function login(token) {
    return dispatch => {
        const {email, name, isAdmin} = jwt_decode(token);
        dispatch({
            type: USER_LOGIN,
            email,
            name,
            isAdmin,
            token
        });
    }
}
export function logout() {
    return async dispatch => {
        const response = await request('/api/auth/logout', 'POST', {}, {});
        if (response) {
            dispatch({
                type: USER_LOGOUT
            })
        }
    }
}

export function refresh() {
    return async dispatch => {
        try {
            const response = await request('/api/auth/refresh', 'POST', {}, {});
            if (response) {
                const token = response.accessToken;
                const {email, name, isAdmin} = jwt_decode(token);
                dispatch({
                    type: USER_LOGIN,
                    email,
                    name,
                    isAdmin,
                    token
                });
            }
        } catch(e) {

        } finally {
            dispatch({
                type: USER_AUTH_LOADED
            });
        }
    }
}

export function loadCourses() {
    return async (dispatch, getState) => {
        const {user: {token}} = getState();
        const response = await request('/api/course/user', 'GET', null, {}, token);
        if (response) {
            i18n.changeLanguage(response.currentCourse.code);
            dispatch({
                type: USER_SET_COURSES,
                currentCourse: response.currentCourse,
                userCourses: response.userCourses,
                otherCourses: response.otherCourses
            });
        }
    }
}
export function changeCourse(courseId) {
    return async (dispatch, getState) => {
        const {user: {token}} = getState();
        const response = await request('/api/course/user', 'POST', {courseId}, {}, token);
        if (response) {
            dispatch({
                type: USER_SET_COURSES,
                currentCourse: response.currentCourse,
                userCourses: response.userCourses,
                otherCourses: response.otherCourses
            });
        }
    }
}

export function homepageLoadCourses() {
    return  async (dispatch) => {
        const courses = await request('/api/course/homepage');

        const sourceLanguages = courses.reduce((arr, course) => {
            if (arr.find(language => language.id === course.sourceLanguage.id))
                return arr;
            return [...arr, course.sourceLanguage];
        }, []);

        let currentLanguage;
        if (localStorage.getItem('homepageLanguageId'))
            currentLanguage = courses.find(course => course.sourceLanguage.id === localStorage.getItem('homepageLanguageId')).sourceLanguage
        else
            currentLanguage = courses.find(course => course.preferred).sourceLanguage;
        i18n.changeLanguage(currentLanguage.code);
        dispatch({
            type: USER_HOMEPAGE_LOAD_COURSES,
            currentLanguage,
            sourceLanguages,
            courses
        });
    }
}
export function homepageChangeLanguage(language) {
    return dispatch => {
        localStorage.setItem('homepageLanguageId', language.id);
        i18n.changeLanguage(language.code);
        dispatch({
            type: USER_HOMEPAGE_CHANGE_LANGUAGE,
            language
        });
    }
}