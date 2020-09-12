import React from 'react';
import './style.scss';
import logo from './logo.png';
import plusIcon from './plusIcon.svg';
import adminIcon from './adminIcon.svg';
import settingsIcon from './settingsIcon.svg';
import logoutIcon from './logoutIcon.svg';
import {Link, NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";

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
        <header>
            <div className="header-container">
                <a className="header-logo" href="/">
                    <img className="" src={logo} alt=""/>
                </a>
                <div className="header-nav">
                    <NavLink className="header-nav-button" to="/content">Content</NavLink>
                    <NavLink className="header-nav-button" to="/dictionary">Dictionary</NavLink>
                    <NavLink className="header-nav-button" to="/training">Training</NavLink>
                </div>
                <div className="header-user">
                    <div className="header-user-language">
                        <img className=""
                             src={currentCourse.image}
                             alt=""/>
                            <div className="language-popup">
                                <div className="language-popup-container">
                                    <div className="language-popup-item language-popup-item-current">
                                        <div className="language-popup-item-icon">
                                            <img className=""
                                                 src={currentCourse.image}
                                                 alt=""/>
                                        </div>
                                        <span className="language-popup-item-text">
                                            {currentCourse.name}
                                        </span>
                                    </div>
                                    <div className="language-popup-delimeter"/>
                                    { otherCourses.map((course) => {
                                        return (
                                            <Link className="language-popup-item language-popup-item-new"
                                                     to="/user/change-course">
                                                <div className="language-popup-item-icon">
                                                    <img className=""
                                                         src={course.image}
                                                         alt=""/>
                                                </div>
                                                <span className="language-popup-item-text">
                                                {course.name}
                                            </span>
                                            </Link>
                                        )}
                                    )}
                                    <Link className="language-popup-item language-popup-item-add"
                                       to="/user/add-course">
                                        <div className="language-popup-item-icon">
                                            <ReactSVG src={plusIcon}/>
                                        </div>
                                        <span className="language-popup-item-text">
                                            Add
                                        </span>
                                    </Link>
                                </div>
                                <div className="language-popup-triangle">
                                    <div className="language-popup-diamond"/>
                                </div>
                            </div>
                    </div>

                    <div className="header-user-profile">
                        <img className="" src={userAvatar} alt=""/>
                            <div className="profile-popup">
                                <div className="profile-popup-container">
                                    { userIsAdmin && (
                                        <Link className="profile-popup-item"
                                                 to="/admin">
                                            <div className="profile-popup-item-icon">
                                                <ReactSVG src={adminIcon}/>
                                            </div>
                                            <span className="profile-popup-item-text">
                                                Admin panel
                                            </span>
                                        </Link>
                                    )
                                    }
                                    <Link className="profile-popup-item"
                                             to="user/settings">
                                        <div className="profile-popup-item-icon">
                                            <ReactSVG src={settingsIcon}/>
                                        </div>
                                        <span className="profile-popup-item-text">
                                            Settings
                                        </span>
                                    </Link>
                                    <Link className="profile-popup-item"
                                       to="/user/logout">
                                        <div className="profile-popup-item-icon">
                                            <ReactSVG src={logoutIcon}/>
                                        </div>
                                        <span className="profile-popup-item-text">
                                            Logout
                                        </span>
                                    </Link>
                                </div>
                                <div className="profile-popup-triangle">
                                    <div className="profile-popup-diamond"/>
                                </div>
                            </div>
                    </div>

                </div>
            </div>
        </header>
    )

}

export default Header;
