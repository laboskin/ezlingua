import React, {useEffect} from 'react';
import Header from "../../../components/Header/Header";
import './style.scss';
import MobileNav from "../../../components/MobileNav/MobileNav";
import {useDispatch, useSelector} from "react-redux";
import {loadCourses} from "../../../store/actions/user";

function MainLayout(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCourses());
    }, [dispatch]);

    const currentCourse = useSelector(state => state.user.courses.currentCourse);
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
