import React from "react";
import './style.scss';
import {useRequest} from "../../../hooks/requestHook";
import {useDispatch, useSelector} from "react-redux";
import {refresh} from "../../../store/actions/user";
import {hideModal} from "../../../store/actions/modal";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers";
import FormInput from "../FormInput/FormInput";
import {useTranslation} from "react-i18next";

function ContactsChangeForm() {
    const currentName = useSelector(state => state.user.name);
    const currentEmail = useSelector(state => state.user.email);
    const { t } = useTranslation();
    const validationSchema = yup.object().shape({
        name: yup.string()
            .trim()
            .min(2, t('contactsChangeForm.errors.nameMore') + ' 1')
            .max(49, t('contactsChangeForm.errors.nameLess') + ' 50'),
        email: yup.string()
            .trim()
            .lowercase()
            .required(t('contactsChangeForm.errors.emailIsRequired'))
            .email(t('contactsChangeForm.errors.validEmail')),
    });
    const { register, handleSubmit, errors } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: currentName,
            email: currentEmail
        }
    });
    const dispatch = useDispatch();
    const {request, isLoading, error: serverError, clearError: clearServerError} = useRequest(true);
    const onSubmit = async ({name, email}) => {
        try {
            const response = await request('/api/user/change-contacts', 'POST', {name, email});
            if (response) {
                dispatch(hideModal());
                dispatch(refresh());
            }
        } catch (e) {}
    };
    return (
        <form className="ContactsChangeForm"
              onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={serverError || errors.email?.message}
                       name="email"
                       id="email"
                       type="text"
                       label={t('contactsChangeForm.email')}
                       onChange={clearServerError}
                       register={register} />
            <FormInput error={serverError || errors.name?.message}
                       name="name"
                       id="name"
                       type="text"
                       label={t('contactsChangeForm.name')}
                       onChange={clearServerError}
                       register={register} />
            <button disabled={isLoading} type="submit" className="ContactsChangeForm-Submit">
                {t('contactsChangeForm.save')}
            </button>
        </form>
    )
}
export default ContactsChangeForm;