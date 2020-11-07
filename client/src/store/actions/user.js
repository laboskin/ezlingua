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
        try {
            const {email, name, isAdmin} = jwt_decode(token);
            dispatch({
                type: USER_LOGIN,
                email,
                name,
                isAdmin,
                token
            });
        } catch (e) {
            console.log(e);
        }
    }
}
export function logout() {
    return async dispatch => {
        try {
            const response = await request('/api/auth/logout', 'POST', {}, {});
            if (response) {
                dispatch({
                    type: USER_LOGOUT
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export function refresh() {
    return async dispatch => {
        try {
            const response = await request('/api/auth/refresh', 'POST', {}, {});
            if (response && response.accessToken) {
                const token = response.accessToken;
                const {email, name, isAdmin} = jwt_decode(token);
                dispatch({
                    type: USER_LOGIN,
                    email,
                    name,
                    isAdmin,
                    token
                });
                setTimeout(() => dispatch(refresh()), (response.accessTokenAge - 60) * 1000);
            }
        } catch(e) {
            const status = e.message.split(' ')[0];
            if (status !== '401')
                console.log(e);
        } finally {
            dispatch({
                type: USER_AUTH_LOADED
            });
        }
    }
}

export function loadCourses() {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/user/user-courses', 'GET', null, {}, token);
            if (response) {
                await i18n.changeLanguage(response.currentCourse.code);
                dispatch({
                    type: USER_SET_COURSES,
                    currentCourse: response.currentCourse,
                    userCourses: response.userCourses,
                    otherCourses: response.otherCourses
                });
            }
        } catch (e) {
            const status = e.message.split(' ')[0];
            if (status === '401') {
                dispatch(logout());
            } else {
                console.log(e);
            }
        }
    }
}
export function changeCourse(courseId) {
    return async (dispatch, getState) => {
        try {
            const {user: {token}} = getState();
            const response = await request('/api/user/change-user-course', 'POST', {courseId}, {}, token);
            if (response) {
                dispatch({
                    type: USER_SET_COURSES,
                    currentCourse: response.currentCourse,
                    userCourses: response.userCourses,
                    otherCourses: response.otherCourses
                });
            }
        } catch (e) {
            const status = e.message.split(' ')[0];
            if (status === '401') {
                dispatch(logout());
            } else {
                console.log(e);
            }
        }
    }
}

export function homepageLoadCourses() {
    return  async (dispatch) => {
        try {
            const courses = await request('/api/user/homepage-courses');
            if (courses) {
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
                await i18n.changeLanguage(currentLanguage.code);
                dispatch({
                    type: USER_HOMEPAGE_LOAD_COURSES,
                    currentLanguage,
                    sourceLanguages,
                    courses
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
export function homepageChangeLanguage(language) {
    return async dispatch => {
        localStorage.setItem('homepageLanguageId', language.id);
        await i18n.changeLanguage(language.code);
        dispatch({
            type: USER_HOMEPAGE_CHANGE_LANGUAGE,
            language
        });
    }
}