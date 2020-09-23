import React from "react";
import './style.scss';
import {useRequest} from "../../../hooks/requestHook";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/actions/auth";
import {hideModal, showLoginModal} from "../../../store/actions/modal";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers";
import FormInput from "../FormInput/FormInput";

function RegisterForm(props) {
    const courses = useSelector(state => state.homepage.courses);
    const currentLanguage = useSelector(state => state.homepage.currentLanguage);
    const languages = courses.filter(course => course.sourceLanguage.id === currentLanguage.id)
        .map(course => ({
            value: course.id,
            text: course.name
        }));
    const validationSchema = yup.object().shape({
        language: yup.string(),
        name: yup.string()
            .trim()
            .min(2, 'Name length must be more than 1')
            .max(49, 'Name length must be less than 50'),
        email: yup.string()
            .trim()
            .lowercase()
            .required('Email is required')
            .email('Please enter valid email'),
        password: yup.string()
            .trim()
            .min(7, 'Password length must be more than 6')
            .max(49, 'Password length must be less than 50')
            .matches(/^([ A-Za-z0-9.$\\/[\]\-_@])/, 'Password contains forbidden characters')
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
        catch (e) {
        }
    };
    return (
        <form className="LoginForm"
              onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={serverError || errors.language?.message}
                       name="language"
                       id="language"
                       type="select"
                       label="Language"
                       placeholder="I want to learn..."
                       onChange={clearServerError}
                       register={register}
                       options={languages} />
            <FormInput error={serverError || errors.name?.message}
                       name="name"
                       id="name"
                       type="text"
                       label="Name"
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={serverError || errors.email?.message}
                       name="email"
                       id="email"
                       type="text"
                       label="Email"
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={errors.password?.message}
                       name="password"
                       id="password"
                       type="password"
                       label="Password"
                       ref={register}
                       onChange={clearServerError}
                       register={register} />
            <button disabled={isLoading} type="submit" className="RegisterForm-Submit">
                Sign up
            </button>
            <div className="RegisterForm-Login">
                <span onClick={() => dispatch(showLoginModal())}>
                    Sign in
                </span>
            </div>
        </form>
    )
}
export default RegisterForm;