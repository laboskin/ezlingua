import {
    USER_HOMEPAGE_CHANGE_LANGUAGE,
    USER_HOMEPAGE_LOAD_COURSES,
    USER_SET_CURRENT_COURSE,
    USER_SET_OTHER_COURSES,
    USER_SET_USER_COURSES
} from './actionTypes';
import {request} from "../../utils/request";
import i18n from 'i18next';
export function loadCourses() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/course/user', 'GET', null, {}, token);
        if (response) {
            i18n.changeLanguage(response.currentCourse.code);
            dispatch(setCurrentCourse(response.currentCourse));
            dispatch(setUserCourses(response.userCourses));
            dispatch(setOtherCourses(response.otherCourses))
        }
    }
}
export function changeCourse(courseId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/course/user', 'POST', {courseId}, {}, token);
        if (response) {
            i18n.changeLanguage(response.currentCourse.code);
            dispatch(setCurrentCourse(response.currentCourse));
            dispatch(setUserCourses(response.userCourses));
            dispatch(setOtherCourses(response.otherCourses))
        }
    }
}
export function setCurrentCourse(course) {
    return {
        type: USER_SET_CURRENT_COURSE,
        course
    }
}
export function setUserCourses(courses) {
    return {
        type: USER_SET_USER_COURSES,
        courses
    }
}
export function setOtherCourses(courses) {
    return {
        type: USER_SET_OTHER_COURSES,
        courses
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