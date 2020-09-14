import React from "react";
import {NavLink} from "react-router-dom";
import './style.scss';
import {ReactComponent as IconContent} from './iconContent.svg';
import {ReactComponent as IconTraining} from './iconTraining.svg';
import {ReactComponent as IconDictionary} from './iconDictionary.svg';

function MobileNav(props) {
    return (
        <div className="MobileNav">
            <NavLink to="/content"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconContent />
                </div>
            </NavLink>
            <NavLink to="/dictionary"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconDictionary />
                </div>
            </NavLink>
            <NavLink to="/training"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconTraining />

                </div>
            </NavLink>
        </div>
    )
}
export default MobileNav;