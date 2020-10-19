import React from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import IconContentDone from "../../icons/IconContentDone/IconContentDone";

function ContentCard(props) {
    if (props.hidden)
        return <div className="ContentCard ContentCard_hidden"/>;

    return (
        <Link className="ContentCard" to={`/content/${props.contentId}`}>
            <div className="ContentCard-Image">
                <img src={props.image} alt=""/>
            </div>
            <div className="ContentCard-Text">
                {props.isUserContent && (
                    <div className="ContentCard-Icon">
                        <IconContentDone />
                    </div>
                )}
                {props.contentName}
            </div>
        </Link>
    )
}

export default ContentCard;