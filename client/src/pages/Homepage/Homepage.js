import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './style.scss';
import homepageLogo from './homepage-logo.png';
import IconArrowDown from "../../icons/IconArrowDown/IconArrowDown";
import homepageBanner from './homepage-banner.png';
import homepageNotebook from './homepage-notebook.png';
import homepageBooks from './homepage-books.png';
import homepagePhone from './homepage-phone.png';
import homepageCertificate from './homepage-certificate.png';
import {showLoginModal, showRegisterModal} from "../../store/actions/modal";
import {useTranslation} from "react-i18next";
import {homepageChangeLanguage, homepageLoadCourses} from "../../store/actions/user";

function Homepage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentLanguage = useSelector(state => state.user.homepage.currentLanguage);
    const languages = useSelector(state => state.user.homepage.sourceLanguages);
    const isLoading = !(currentLanguage && languages);
    useEffect(() => {dispatch(homepageLoadCourses())}, [dispatch]);
    useEffect(()=>{
        const scrollHandler = () => {
            if (window.scrollY - window.outerHeight >= -70)
                document.querySelector('.Homepage-HeaderButtons').classList.add('Homepage-HeaderButtons_visible')
            else
                document.querySelector('.Homepage-HeaderButtons').classList.remove('Homepage-HeaderButtons_visible')
        }
        window.addEventListener('scroll', scrollHandler);
        return ()=> {window.removeEventListener('scroll', scrollHandler)}
    });

    if (isLoading) return null;
    return (
        <div className="Homepage">
            <header className="Homepage-Header">
                <div className="Homepage-HeaderContainer">
                    <a className="Homepage-HeaderLogo" href="/">
                        <img src={homepageLogo} alt=""/>
                    </a>
                    <div className="Homepage-HeaderLanguage">
                        <div className="Homepage-HeaderLanguageButton">
                            <div className="Homepage-HeaderLanguageButtonText">
                                {t('homepage.websiteLanguage')}: {currentLanguage.name}
                            </div>
                            <IconArrowDown />
                            <div className="Homepage-HeaderLanguagePopup">
                                <div className="Homepage-HeaderLanguagePopupContainer">
                                    {
                                        languages.map(language => (
                                            <div className="Homepage-HeaderLanguagePopupItem"
                                                 key={language.name}
                                                 onClick={() => dispatch(homepageChangeLanguage(language))}>
                                                <div className="Homepage-HeaderLanguagePopupItemIcon">
                                                    <img src={language.image} alt=""/>
                                                </div>
                                                <span className="Homepage-HeaderLanguagePopupItemText">
                                                    {language.name}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="Homepage-HeaderLanguagePopupTriangle">
                                    <div className="Homepage-HeaderLanguagePopupDiamond"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Homepage-HeaderButtons">
                        <div className="Homepage-HeaderButton Homepage-HeaderButton_signup"
                             onClick={() => dispatch(showRegisterModal())}>
                            {t('homepage.start')}
                        </div>
                        <div className="Homepage-HeaderButton Homepage-HeaderButton_login"
                             onClick={() => dispatch(showLoginModal())}>
                            {t('homepage.signIn')}
                        </div>

                    </div>
                </div>
            </header>
            <main className="Homepage-Main">
                <div className="Homepage-MainBanner">
                    <div className="Homepage-MainBannerText">
                        <div className="Homepage-MainBannerDescription">
                            <span className="Homepage-MainBannerDescription_large">{t('homepage.banner.title')}</span>
                            <br/>
                            <span className="Homepage-MainBannerDescription_small">{t('homepage.banner.description')}</span>
                        </div>
                        <div className="Homepage-MainBannerButton Homepage-MainBannerButton_signup"
                             onClick={() => dispatch(showRegisterModal())}>
                            {t('homepage.start')}
                        </div>
                        <div className="Homepage-MainBannerButton Homepage-MainBannerButton_login"
                             onClick={() => dispatch(showLoginModal())}>
                            {t('homepage.signInToAccount')}
                        </div>

                    </div>
                    <div className="Homepage-MainBannerImage">
                        <img src={homepageBanner} alt=""/>
                    </div>
                </div>
                <div className="Homepage-MainFeatures">
                    <div className="Homepage-MainFeaturesContainer">
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockImage">
                                <img src={homepageNotebook} alt=""/>
                            </div>
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    {t('homepage.features.bestWay.title')}
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    {t('homepage.features.bestWay.description')}
                                </div>
                            </div>
                        </div>
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    {t('homepage.features.fromQuotes.title')}
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    {t('homepage.features.fromQuotes.description')}
                                </div>
                            </div>
                            <div className="Homepage-MainFeaturesBlockImage">
                                <img src={homepageCertificate} alt=""/>
                            </div>
                        </div>
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockImage">
                                <img src={homepageBooks} alt=""/>
                            </div>
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    {t('homepage.features.getReady.title')}
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    {t('homepage.features.getReady.description')}
                                </div>
                            </div>
                        </div>
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    {t('homepage.features.speedUp.title')}
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    {t('homepage.features.speedUp.description')}
                                </div>
                            </div>
                            <div className="Homepage-MainFeaturesBlockImage">
                                <img src={homepagePhone} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Homepage;
