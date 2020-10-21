import React from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import IconFilledCheckmark from "../../icons/IconFilledCheckmark/IconFilledCheckmark";

function StoryCard(props) {
    if (props.hidden)
        return <div className="StoryCard StoryCard_hidden"/>;

    return (
        <Link className="StoryCard" to={`/stories/${props.id}`}>
            <div className="StoryCard-Image">
                <img src={props.image} alt=""/>
            </div>
            <div className="StoryCard-Text">
                {props.isUserStory && (
                    <div className="StoryCard-Icon">
                        <IconFilledCheckmark />
                    </div>
                )}
                {props.name}
            </div>
        </Link>
    )
}

export default StoryCard;