import {
    HOMEPAGE_SET_COURSES,
    HOMEPAGE_SET_CURRENT_LANGUAGE,
    HOMEPAGE_SET_SOURCE_LANGUAGES,
    HOMEPAGE_STOP_LOADING
} from './actionTypes';
import {request} from "../../utils/request";

export function loadCourses() {
    return  async (dispatch) => {
        const courses = await request('/api/course/homepage');
        dispatch(setCourses(courses));

        const sourceLanguages = courses.reduce((arr, course) => {
            if (arr.find(language => language.id === course.sourceLanguage.id))
                return arr;
            return [...arr, course.sourceLanguage];
        }, []);
        dispatch(setSourceLanguages(sourceLanguages));

        let currentLanguage;
        if (localStorage.getItem('homepageLanguageId'))
            currentLanguage = courses.find(course => course.sourceLanguage.id === localStorage.getItem('homepageLanguageId')).sourceLanguage
        else
            currentLanguage = courses.find(course => course.preferred).sourceLanguage;
        dispatch(setCurrentLanguage(currentLanguage));

        dispatch(stopLoading());
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
export function setCurrentLanguage(language) {
    localStorage.setItem('homepageLanguageId', language.id);
    return {
        type: HOMEPAGE_SET_CURRENT_LANGUAGE,
        language
    }
}