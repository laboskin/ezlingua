import React from "react";
import {NavLink} from "react-router-dom";
import './style.scss';
import {ReactSVG} from "react-svg";
import contentIcon from './contentIcon.svg';
import trainingIcon from './trainingIcon.svg';
import dictionaryIcon from './dictionaryIcon.svg';

function Footer(props) {
    return (
        <footer>
            <NavLink to="/content"
                     className="footer-item"
                     activeClassName="footer-item-current">
                <div className="footer-item-icon">
                    <ReactSVG src={contentIcon} />
                </div>
            </NavLink>
            <NavLink to="/dictionary"
                     className="footer-item"
                     activeClassName="footer-item-current">
                <div className="footer-item-icon">
                    <ReactSVG src={dictionaryIcon} />
                </div>
            </NavLink>
            <NavLink to="/training"
                     className="footer-item"
                     activeClassName="footer-item-current">
                <div className="footer-item-icon">
                    <ReactSVG src={trainingIcon} />

                </div>
            </NavLink>
        </footer>
    )
}
export default Footer;