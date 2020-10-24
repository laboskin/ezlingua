import React from "react";
import {NavLink} from "react-router-dom";
import './style.scss';
import IconMobileContent from "../../icons/mobile/IconMobileContent/IconMobileContent";
import IconMobileDictionary from "../../icons/mobile/IconMobileDictionary/IconMobileDictionary";
import IconMobileTraining from "../../icons/mobile/IconMobileTraining/IconMobileTraining";

function MobileNav() {
    return (
        <div className="MobileNav">
            <NavLink to="/stories"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconMobileContent />
                </div>
            </NavLink>
            <NavLink to="/dictionary"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconMobileDictionary />
                </div>
            </NavLink>
            <NavLink to="/training"
                     className="MobileNav-Item"
                     activeClassName="MobileNav-Item_current">
                <div className="MobileNav-ItemIcon">
                    <IconMobileTraining />

                </div>
            </NavLink>
        </div>
    )
}
export default MobileNav;