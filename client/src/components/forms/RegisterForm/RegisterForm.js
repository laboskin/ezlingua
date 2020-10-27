import React from "react";
import './style.scss';
import {useRequest} from "../../../hooks/requestHook";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/actions/user";
import {hideModal, showLoginModal} from "../../../store/actions/modal";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers";
import FormInput from "../FormInput/FormInput";
import {useTranslation} from "react-i18next";

function RegisterForm() {
    const { t } = useTranslation();
    const courses = useSelector(state => state.user.homepage.courses);
    const currentLanguage = useSelector(state => state.user.homepage.currentLanguage);
    const languages = courses.filter(course => course.sourceLanguage.id === currentLanguage.id)
        .map(course => ({
            value: course.id,
            text: course.name
        }));
    const validationSchema = yup.object().shape({
        language: yup.string(),
        name: yup.string()
            .trim()
            .min(2, t('registerForm.errors.nameMore') + ' 1')
            .max(49, t('registerForm.errors.nameLess') + ' 50'),
        email: yup.string()
            .trim()
            .lowercase()
            .required(t('registerForm.errors.emailIsRequired'))
            .email(t('registerForm.errors.validEmail')),
        password: yup.string()
            .trim()
            .min(7, t('registerForm.errors.passwordMore') + ' 6')
            .max(49, t('registerForm.errors.passwordLess') + ' 50')
            .matches(/^([A-Za-z0-9.$\\/[\]\-_@])/, t('registerForm.errors.passwordForbiddenCharacters'))
    });
    const { register, handleSubmit, errors } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useDispatch();
    const {request, isLoading, error: serverError, clearError: clearServerError} = useRequest(false);
    const onSubmit = async ({language, name, email, password}) => {
        try {
            const response = await request('/api/auth/register', 'POST', {language, name, email, password});
            if (response) {
                dispatch(hideModal());
                dispatch(login(response.accessToken));
            }
        }
        catch (e) {}
    };
    return (
        <form className="LoginForm"
              onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={serverError || errors.language?.message}
                       name="language"
                       id="language"
                       type="select"
                       label={t('registerForm.language')}
                       placeholder="I want to learn..."
                       onChange={clearServerError}
                       register={register}
                       options={languages} />
            <FormInput error={serverError || errors.name?.message}
                       name="name"
                       id="name"
                       type="text"
                       label={t('registerForm.name')}
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={serverError || errors.email?.message}
                       name="email"
                       id="email"
                       type="text"
                       label={t('registerForm.email')}
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={errors.password?.message}
                       name="password"
                       id="password"
                       type="password"
                       label={t('registerForm.password')}
                       ref={register}
                       onChange={clearServerError}
                       register={register} />
            <button disabled={isLoading} type="submit" className="RegisterForm-Submit">
                {t('registerForm.signUp')}
            </button>
            <div className="RegisterForm-Login">
                <span onClick={() => dispatch(showLoginModal())}>
                    {t('registerForm.signIn')}
                </span>
            </div>
        </form>
    )
}
export default RegisterForm;