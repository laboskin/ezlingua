import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import IconProgressLowHorizontal from "../../icons/Progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal from "../../icons/Progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/Progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import IconTrash from "../../icons/IconTrash/IconTrash";
import IconSpeaker from "../../icons/IconSpeaker/IconSpeaker";

function WordsTable(props) {

    return (
        <div className="words-table">
            {
                props.words.map(word => (
                    <div className="words-row">
                        <div className="word-audio">
                            <IconSpeaker />
                        </div>
                        <div className="word-text">
                            <div className="word-original">
                                {word.original}
                            </div>
                            <div className="word-translation">
                                {word.translation}
                            </div>
                        </div>
                        <Link className="word-vocabulary"
                              to={`/dictionary/my/${word.vocabularyId}`}>
                            {word.vocabularyName}
                        </Link>
                        <div className="word-progress">
                            <div className="word-progress-icon">
                                <IconProgressHighHorizontal />
                            </div>
                        </div>
                        <div className="word-actions-delete">
                            <IconTrash />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default WordsTable;
