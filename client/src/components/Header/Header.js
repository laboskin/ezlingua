import React from 'react';
import './style.scss';
import logo from './logo.png';
import IconPlus from "../../icons/IconPlus/IconPlus";
import IconAdmin from "../../icons/IconAdmin/IconAdmin";
import IconSettings from "../../icons/IconSettings/IconSettings";
import IconLogout from "../../icons/IconLogout/IconLogout";
import {Link, NavLink} from "react-router-dom";

// TODO
import userAvatar from './avatar.jpg';
import currentCourseImg from './en.png';

function Header() {
    const currentCourse = {
        name: 'English',
        image: currentCourseImg

    };
    const otherCourses = [
        {
            name: 'English',
            image: currentCourseImg
        },
        {
            name: 'English 2',
            image: currentCourseImg
        }
    ];
    const userIsAdmin = true;
    return (
        <header className="Header">
            <div className="Header-Container">
                <a className="Header-Logo" href="/">
                    <img className="" src={logo} alt=""/>
                </a>
                <div className="Header-Nav">
                    <NavLink className="Header-NavButton" to="/content">Content</NavLink>
                    <NavLink className="Header-NavButton" to="/dictionary">Dictionary</NavLink>
                    <NavLink className="Header-NavButton" to="/training">Training</NavLink>
                </div>
                <div className="Header-User">
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
                                    { otherCourses.map((course) => {
                                        return (
                                            <Link className="Header-LanguagePopupItem Header-LanguagePopupItem_new"
                                                     to="/user/change-course">
                                                <div className="Header-LanguagePopupItemImage">
                                                    <img className=""
                                                         src={course.image}
                                                         alt=""/>
                                                </div>
                                                <span className="Header-LanguagePopupItemText">
                                                {course.name}
                                            </span>
                                            </Link>
                                        )}
                                    )}
                                    <Link className="Header-LanguagePopupItem Header-LanguagePopupItem_add"
                                       to="/user/add-course">
                                        <div className="Header-LanguagePopupItemIcon">
                                            <IconPlus />
                                        </div>
                                        <span className="Header-LanguagePopupItemText">
                                            Add
                                        </span>
                                    </Link>
                                </div>
                                <div className="Header-LanguagePopupTriangle">
                                    <div className="Header-LanguagePopupDiamond"/>
                                </div>
                            </div>
                    </div>

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
                                    <Link className="Header-ProfilePopupItem"
                                       to="/user/logout">
                                        <div className="Header-ProfilePopupItemIcon">
                                            <IconLogout />
                                        </div>
                                        <span className="Header-ProfilePopupItemText">
                                            Logout
                                        </span>
                                    </Link>
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
