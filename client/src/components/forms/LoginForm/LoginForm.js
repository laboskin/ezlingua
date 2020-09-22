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

function LoginForm(props) {
    const validationSchema = yup.object().shape({
        email: yup.string()
            .trim()
            .lowercase()
            .required('Email is required')
            .email('Please enter valid email'),
        password: yup.string()
            .trim()
            .min(7, 'Password length must be more than 6')
            .max(49, 'Password length must be less than 50')
            .matches(/^([A-Za-z0-9.$\\/[\]\-_@])/, 'Password contains forbidden characters')
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
            <button disabled={isLoading} type="submit" className="LoginForm-Submit">
                Login
            </button>
            <div className="LoginForm-Register">
                <span onClick={() => dispatch(showRegisterModal())}>
                    Sign up
                </span>
            </div>
        </form>
    )
}
export default LoginForm;