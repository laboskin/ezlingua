import React from 'react';
import {Link, useParams} from "react-router-dom";
import './style.scss';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";

function TrainingResults(props) {
    const {id: vocabularyId = ''} = useParams();

    return (
        <div className="TrainingResult">
            <div className="TrainingResult-Title">
                <div className="TrainingResult-Name">
                    {props.title}
                </div>
            </div>
            <div className="TrainingResult-Card">
                Results
            </div>
            <div className="TrainingResult-Words">
                {
                    props.words.map(word => (
                        <div className={`TrainingResult-Word ${word.correct?'TrainingResult-Word_correct':'TrainingResult-Word_wrong'}`}>
                            <span className="TrainingResult-WordOriginal">
                                    {word.original}
                                </span>
                            <span className="TrainingResult-WordDash">
                                    —
                                </span>
                            <span className="TrainingResult-WordTranslation">
                                    {word.translation}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="TrainingResult-Buttons">
                <Link className="TrainingResult-Button TrainingResult-Button_exit"
                      to={`/training/${vocabularyId}`}>
                    <div className="TrainingResult-ButtonText">
                        Exit
                    </div>
                </Link>
                <div className="TrainingResult-Button TrainingResult-Button_continue"
                     onClick={props.handleReload}>
                    <div className="TrainingResult-ButtonText">
                        Continue
                    </div>
                    <IconArrowRight />
                </div>
            </div>
        </div>

    )
}

export default TrainingResults;
