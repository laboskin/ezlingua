import React, {useEffect} from 'react';
import Header from "../../../components/Header/Header";
import './style.scss';
import MobileNav from "../../../components/MobileNav/MobileNav";
import {useDispatch, useSelector} from "react-redux";
import {loadCourses} from "../../../store/actions/user";
import {useTranslation} from "react-i18next";

function MainLayout(props) {
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const languageCode = currentCourse?currentCourse.code:null;

    useEffect(() => {
        dispatch(loadCourses());
    }, [dispatch]);

    useEffect(() => {
        if(languageCode)
            i18n.changeLanguage(languageCode);
    }, [i18n, languageCode]);

    if (!currentCourse) return null;

    return (
        <div className="MainLayout">
            <Header />
            <main className="MainLayout-Main">
                {props.children}
            </main>
            <MobileNav />
        </div>
    )
}

export default MainLayout;
