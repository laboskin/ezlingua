import {
    MODAL_SHOW,
    MODAL_HIDE
} from './actionTypes'
import React from "react";
import i18n from 'i18next';
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import CourseSelectForm from "../../components/forms/CourseSelectForm/CourseSelectForm";
import ContactsChangeForm from "../../components/forms/ContactsChangeForm/ContactsChangeForm";
import PasswordChangeForm from "../../components/forms/PasswordChangeForm/PasswordChangeForm";

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
export function showSettingsModal() {
    return dispatch => dispatch(showModal(i18n.t('contactsChangeForm.settings'), (
        <React.Fragment>
            <ContactsChangeForm />
            <PasswordChangeForm />
        </React.Fragment>
    )));
}

export function hideModal() {
    return {
        type: MODAL_HIDE,
    }
}