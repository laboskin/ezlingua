import React from "react";
import './style.scss';
import {useRequest} from "../../../hooks/requestHook";
import {useDispatch} from "react-redux";
import {login} from "../../../store/actions/auth";
import {hideModal, showRegisterModal} from "../../../store/actions/modal";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers";
import FormInput from "../FormInput/FormInput";
import {useTranslation} from "react-i18next";

function LoginForm() {
    const { t } = useTranslation();
    const validationSchema = yup.object().shape({
        email: yup.string()
            .trim()
            .lowercase()
            .required(t('loginForm.errors.emailIsRequired'))
            .email(t('loginForm.errors.validEmail')),
        password: yup.string()
            .trim()
            .min(7, t('loginForm.errors.passwordMore') + ' 6')
            .max(49, t('loginForm.errors.passwordLess') + ' 50')
            .matches(/^([A-Za-z0-9.$\\/[\]\-_@])/, t('loginForm.errors.passwordForbiddenCharacters'))
    });
    const { register, handleSubmit, errors } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useDispatch();
    const {request, isLoading, error: serverError, clearError: clearServerError} = useRequest(false);
    const onSubmit = async ({email, password}) => {
        try {
            const response = await request('/api/auth/login', 'POST', {email, password});
            if (response) {
                dispatch(hideModal());
                dispatch(login(response.accessToken));
            }
        }
        catch (e) {
        }
    };
    return (
        <form className="LoginForm"
              onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={serverError || errors.email?.message}
                       name="email"
                       id="email"
                       type="text"
                       label={t('loginForm.email')}
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={errors.password?.message}
                       name="password"
                       id="password"
                       type="password"
                       label={t('loginForm.password')}
                       ref={register}
                       onChange={clearServerError}
                       register={register} />
            <button disabled={isLoading} type="submit" className="LoginForm-Submit">
                {t('loginForm.login')}
            </button>
            <div className="LoginForm-Register">
                <span onClick={() => dispatch(showRegisterModal())}>
                    {t('loginForm.signUp')}
                </span>
            </div>
        </form>
    )
}
export default LoginForm;