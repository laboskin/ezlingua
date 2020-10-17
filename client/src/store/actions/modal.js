import {
    MODAL_SHOW,
    MODAL_HIDE
} from './actionTypes'
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import React from "react";
import CourseSelectForm from "../../components/forms/CourseSelectForm/CourseSelectForm";

export function showModal(title, content) {
    return {
        type: MODAL_SHOW,
        title,
        content
    }
}

export function showLoginModal() {
    return dispatch => dispatch(showModal('Login to your account', <LoginForm />));
}

export function showRegisterModal() {
    return dispatch => dispatch(showModal('Create new account', <RegisterForm />));
}
export function showCourseSelectModal() {
    return dispatch => dispatch(showModal('Available courses', <CourseSelectForm />));
}

export function hideModal() {
    return {
        type: MODAL_HIDE,
    }
}