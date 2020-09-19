import React, {useEffect, useState} from 'react';
import './style.scss';
import homepageLogo from './homepage-logo.png';
import IconArrowDown from "../../icons/IconArrowDown/IconArrowDown";
import homepageBanner from './homepage-banner.png';
import homepageNotebook from './homepage-notebook.png';
import homepageBooks from './homepage-books.png';
import homepagePhone from './homepage-phone.png';
import homepageCertificate from './homepage-certificate.png';


// TODO
import courseImg from './en.png';

const languages = [
    {
        name: 'English',
        image: courseImg
    }
];

function Homepage() {
    const scrollHandler = (event) => {
        if (window.scrollY - window.outerHeight >= -70)
            document.querySelector('.Homepage-HeaderButtons').classList.add('Homepage-HeaderButtons_visible')
        else
            document.querySelector('.Homepage-HeaderButtons').classList.remove('Homepage-HeaderButtons_visible')
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollHandler);
        return ()=> {window.removeEventListener('scroll', scrollHandler)}
    })
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
                                Website language: English
                            </div>
                            <IconArrowDown />
                            <div className="Homepage-HeaderLanguagePopup">
                                <div className="Homepage-HeaderLanguagePopupContainer">
                                    {
                                        languages.map(language => (
                                            <div className="Homepage-HeaderLanguagePopupItem">
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
                        <div className="Homepage-HeaderButton Homepage-HeaderButton_signup">
                            Start
                        </div>
                        <div className="Homepage-HeaderButton Homepage-HeaderButton_login">
                            Sign In
                        </div>

                    </div>
                </div>
            </header>
            <main className="Homepage-Main">
                <div className="Homepage-MainBanner">
                    <div className="Homepage-MainBannerText">
                        <div className="Homepage-MainBannerDescription">
                            <span
                                className="Homepage-MainBannerDescription_large">Learn foreign languages online.
                            </span>
                            <br/>
                            <span
                                className="Homepage-MainBannerDescription_small">Easy, efficient, free.
                            </span>
                        </div>
                        <div className="Homepage-MainBannerButton Homepage-MainBannerButton_signup">
                            Start
                        </div>
                        <div className="Homepage-MainBannerButton Homepage-MainBannerButton_login">
                            Sign in to account
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
                                    The best way to learn foreign languages
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    Forget about boring textbooks, thick dictionaries and trips to tutors. Learn foreign languages online with ezlingua! Anywhere in the world, from any device and at any time convenient for you.
                                </div>
                            </div>
                        </div>
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    From quotes to literary masterpieces
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    Here you will find many texts in foreign languages, by studying which you can not only learn new words, but also learn a lot for yourself. The site contains materials of varying complexity - suitable for both beginners and polyglot.
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
                                    Get ready for an interview or an international travel
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    No more hours of searching for translations of words and copying them into a notebook. Using thematic sets of foreign words, you can prepare for an important event - from going to a restaurant to an important interview. Choose the appropriate set of words and add the necessary words to your personal dictionary.
                                </div>
                            </div>
                        </div>
                        <div className="Homepage-MainFeaturesBlock">
                            <div className="Homepage-MainFeaturesBlockText">
                                <div className="Homepage-MainFeaturesBlockTitle">
                                    Speed up your progress
                                </div>
                                <div className="Homepage-MainFeaturesBlockDescription">
                                    Learn foreign words with training. A wide selection of vocabulary workouts is available on the site - from classic vocabulary cards to word constructor. Take training, track progress and improve your language skills.
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
