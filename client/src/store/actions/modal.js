import {
    MODAL_SHOW,
    MODAL_HIDE
} from './actionTypes'
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import React from "react";
import CourseSelectForm from "../../components/forms/CourseSelectForm/CourseSelectForm";
import i18n from 'i18next';

export function showModal(title, content) {
    return {
        type: MODAL_SHOW,
        title,
        content
    }
}

export function showLoginModal() {
    return dispatch => dispatch(showModal(i18n.t('loginForm.loginToYourAccount'), <LoginForm />));
}

export function showRegisterModal() {
    return dispatch => dispatch(showModal(i18n.t('registerForm.createNewAccount'), <RegisterForm />));
}
export function showCourseSelectModal() {
    return dispatch => dispatch(showModal(i18n.t('courseSelectForm.availableCourses'), <CourseSelectForm />));
}

export function hideModal() {
    return {
        type: MODAL_HIDE,
    }
}