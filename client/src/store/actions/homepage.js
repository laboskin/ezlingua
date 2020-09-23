import {
    HOMEPAGE_SET_COURSES, HOMEPAGE_SET_CURRENT_LANGUAGE,
    HOMEPAGE_SET_GOAL_LANGUAGES,
    HOMEPAGE_SET_SOURCE_LANGUAGES, HOMEPAGE_STOP_LOADING

} from './actionTypes';
import {request} from "../../utils/request";

export function loadCourses() {
    return  async (dispatch) => {
        const courses = await request('/api/course/all');
        dispatch(setCourses(courses));

        const sourceLanguages = courses.reduce((arr, course) => {
            if (arr.find(language => language.id === course.sourceLanguage.id))
                return arr;
            return [...arr, course.sourceLanguage];
        }, []);
        dispatch(setSourceLanguages(sourceLanguages));

        const currentLanguage = courses.find(course => course.preferred).sourceLanguage;
        dispatch(changeCurrentLanguage(currentLanguage));

        dispatch(stopLoading());
    }
}
export function changeCurrentLanguage(language) {
    return (dispatch, getState) => {
        const courses = getState().homepage.courses;
        const goalLanguages = courses.filter(course => course.sourceLanguage.id === language.id)
            .map(course => course.goalLanguage);
        dispatch(setCurrentLanguage(language));
        dispatch(setGoalLanguages(goalLanguages));

    }
}
export function stopLoading() {
    return {
        type: HOMEPAGE_STOP_LOADING
    }
}

export function setCourses(courses) {
    return {
        type: HOMEPAGE_SET_COURSES,
        courses
    }
}
export function setSourceLanguages(languages) {
    return {
        type: HOMEPAGE_SET_SOURCE_LANGUAGES,
        languages
    }
}
export function setGoalLanguages(languages) {
    return {
        type: HOMEPAGE_SET_GOAL_LANGUAGES,
        languages
    }
}
export function setCurrentLanguage(language) {
    return {
        type: HOMEPAGE_SET_CURRENT_LANGUAGE,
        language
    }
}