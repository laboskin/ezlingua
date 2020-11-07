import React from "react";
import './style.scss';
import {useRequest} from "../../../hooks/requestHook";
import {useDispatch} from "react-redux";
import {refresh} from "../../../store/actions/user";
import {hideModal} from "../../../store/actions/modal";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers";
import FormInput from "../FormInput/FormInput";
import {useTranslation} from "react-i18next";

function PasswordChangeForm() {
    const { t } = useTranslation();
    const validationSchema = yup.object().shape({
        currentPassword: yup.string()
            .trim()
            .min(8, t('passwordChangeForm.errors.passwordMore') + ' 7')
            .max(50, t('passwordChangeForm.errors.passwordLess') + ' 51')
            .matches(/^([A-Za-z0-9.$\\/[\]\-_@])/, t('passwordChangeForm.errors.passwordForbiddenCharacters')),
        newPassword: yup.string()
            .trim()
            .min(8, t('passwordChangeForm.errors.passwordMore') + ' 7')
            .max(50, t('passwordChangeForm.errors.passwordLess') + ' 51')
            .matches(/^([A-Za-z0-9.$\\/[\]\-_@])/, t('passwordChangeForm.errors.passwordForbiddenCharacters'))
    });
    const { register, handleSubmit, errors } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useDispatch();
    const {request, isLoading, error: serverError, clearError: clearServerError} = useRequest(true);
    const onSubmit = async ({currentPassword, newPassword}) => {
        try {
            const response = await request('/api/user/change-password', 'POST', {currentPassword, newPassword});
            if (response) {
                dispatch(hideModal());
                dispatch(refresh());
            }
        } catch (e) {}
    };
    return (
        <form className="PasswordChangeForm"
              onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={serverError || errors.currentPassword?.message}
                       name="currentPassword"
                       id="currentPassword"
                       type="password"
                       label={t('passwordChangeForm.currentPassword')}
                       ref={register}
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={serverError || errors.currentPassword?.message}
                       name="newPassword"
                       id="newPassword"
                       type="password"
                       label={t('passwordChangeForm.newPassword')}
                       ref={register}
                       onChange={clearServerError}
                       register={register} />
            <button disabled={isLoading} type="submit" className="PasswordChangeForm-Submit">
                {t('passwordChangeForm.save')}
            </button>
        </form>
    )
}
export default PasswordChangeForm;