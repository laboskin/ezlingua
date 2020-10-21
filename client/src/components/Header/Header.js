import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './style.scss';
import logo from './logo.png';
import IconPlus from "../../icons/IconPlus/IconPlus";
import IconAdmin from "../../icons/IconAdmin/IconAdmin";
import IconSettings from "../../icons/IconSettings/IconSettings";
import IconLogout from "../../icons/IconLogout/IconLogout";
import {logout} from "../../store/actions/auth";
import {useRequest} from "../../hooks/requestHook";
import {changeCourse} from "../../store/actions/user";


import userAvatar from './avatar.jpg';
import {showCourseSelectModal} from "../../store/actions/modal";

function Header() {
    const dispatch = useDispatch();

    const {request} = useRequest();
    const logoutHandler = async () => {
        try {
            await request('/api/auth/logout', 'POST');
            if (request) {
                dispatch(logout());
            }
        }
        catch (e) {
        }
    }
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const userCourses = useSelector(state => state.user.courses.userCourses);
    const userIsAdmin = true; // TODO

    return (
        <header className="Header">
            <div className="Header-Container">
                <a className="Header-Logo" href="/">
                    <img className="" src={logo} alt=""/>
                </a>
                <div className="Header-Nav">
                    <NavLink className="Header-NavButton" to="/stories">Stories</NavLink>
                    <NavLink className="Header-NavButton" to="/dictionary">Dictionary</NavLink>
                    <NavLink className="Header-NavButton" to="/training">Training</NavLink>
                </div>
                <div className="Header-User">
                    {
                        currentCourse && (
                            <div className="Header-Language">
                                <img className=""
                                     src={currentCourse.image}
                                     alt=""/>
                                <div className="Header-LanguagePopup">
                                    <div className="Header-LanguagePopupContainer">
                                        <div className="Header-LanguagePopupItem Header-LanguagePopupItem_current">
                                            <div className="Header-LanguagePopupItemImage">
                                                <img className=""
                                                     src={currentCourse.image}
                                                     alt=""/>
                                            </div>
                                            <span className="Header-LanguagePopupItemText">
                                            {currentCourse.name}
                                        </span>
                                        </div>
                                        <div className="Header-LanguagePopupDelimeter"/>
                                        { userCourses.map((course) => {
                                            return (
                                                <div key={course.name} className="Header-LanguagePopupItem Header-LanguagePopupItem_new"
                                                     onClick={() => dispatch(changeCourse(course.id))}>
                                                    <div className="Header-LanguagePopupItemImage">
                                                        <img className=""
                                                             src={course.image}
                                                             alt=""/>
                                                    </div>
                                                    <span className="Header-LanguagePopupItemText">
                                                {course.name}
                                            </span>
                                                </div>
                                            )}
                                        )}
                                        <div className="Header-LanguagePopupItem Header-LanguagePopupItem_add"
                                              onClick={() => dispatch(showCourseSelectModal())}>
                                            <div className="Header-LanguagePopupItemIcon">
                                                <IconPlus />
                                            </div>
                                            <span className="Header-LanguagePopupItemText">
                                            Add
                                        </span>
                                        </div>
                                    </div>
                                    <div className="Header-LanguagePopupTriangle">
                                        <div className="Header-LanguagePopupDiamond"/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="Header-Profile">
                        <img className="" src={userAvatar} alt=""/>
                            <div className="Header-ProfilePopup">
                                <div className="Header-ProfilePopupContainer">
                                    { userIsAdmin && (
                                        <Link className="Header-ProfilePopupItem"
                                                 to="/admin">
                                            <div className="Header-ProfilePopupItemIcon">
                                                <IconAdmin />
                                            </div>
                                            <span className="Header-ProfilePopupItemText">
                                                Admin panel
                                            </span>
                                        </Link>
                                    )
                                    }
                                    <Link className="Header-ProfilePopupItem"
                                             to="user/settings">
                                        <div className="Header-ProfilePopupItemIcon">
                                            <IconSettings />
                                        </div>
                                        <span className="Header-ProfilePopupItemText">
                                            Settings
                                        </span>
                                    </Link>
                                    <div className="Header-ProfilePopupItem"
                                       onClick={logoutHandler}>
                                        <div className="Header-ProfilePopupItemIcon">
                                            <IconLogout />
                                        </div>
                                        <span className="Header-ProfilePopupItemText">
                                            Logout
                                        </span>
                                    </div>
                                </div>
                                <div className="Header-ProfilePopupTriangle">
                                    <div className="Header-ProfilePopupDiamond"/>
                                </div>
                            </div>
                    </div>

                </div>
            </div>
        </header>
    )

}

export default Header;
