import React from "react";
import {NavLink} from "react-router-dom";
import './style.scss';
import {ReactSVG} from "react-svg";
import contentIcon from './contentIcon.svg';
import trainingIcon from './trainingIcon.svg';
import dictionaryIcon from './dictionaryIcon.svg';

function MobileNav(props) {
    return (
        <div className="MobileNav">
            <NavLink to="/content"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <ReactSVG src={contentIcon} />
                </div>
            </NavLink>
            <NavLink to="/dictionary"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <ReactSVG src={dictionaryIcon} />
                </div>
            </NavLink>
            <NavLink to="/training"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <ReactSVG src={trainingIcon} />

                </div>
            </NavLink>
        </div>
    )
}
export default MobileNav;