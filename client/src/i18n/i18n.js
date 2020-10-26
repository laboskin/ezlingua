import i18n from 'i18next';
import ICU from "i18next-icu";
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en';
import ruTranslation from './locales/ru';

const resources = {
    en: {
        translation: enTranslation
    },
    ru: {
        translation: ruTranslation
    }
}


i18n
    .use(initReactI18next)
    .use(ICU)
    .init({
        resources,
        lng: 'ru',
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false,
        }
    });


export default i18n;