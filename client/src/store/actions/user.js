import {
    USER_SET_CURRENT_COURSE, USER_SET_OTHER_COURSES, USER_SET_USER_COURSES

} from './actionTypes';
import {request} from "../../utils/request";

export function loadCourses() {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/course/user', 'GET', null, {}, token);
        dispatch(setCurrentCourse(response.currentCourse));
        dispatch(setUserCourses(response.userCourses));
        dispatch(setOtherCourses(response.otherCourses))
    }
}
export function changeCourse(courseId) {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();
        const response = await request('/api/course/user', 'POST', {courseId}, {}, token);
        dispatch(setCurrentCourse(response.currentCourse));
        dispatch(setUserCourses(response.userCourses));
        dispatch(setOtherCourses(response.otherCourses))
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