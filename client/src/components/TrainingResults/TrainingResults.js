import React from 'react';
import {Link, useParams} from "react-router-dom";
import './style.scss';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";

function TrainingResults(props) {
    const {id: vocabularyId = ''} = useParams();

    return (
        <MainContainer maxWidth="700px">
            <div className="page-title">
                <div className="page-name">
                    <div className="page-name-text">{props.title}</div>
                </div>
            </div>
            <div className="training-card">
                <div className="training-word">
                    <div className="training-word-text">
                        Results
                    </div>
                </div>
                <div className="training-results">
                    {
                        props.words.map(word => (
                            <div className={`training-result ${word.correct?'correct':'wrong'}`}>
                                <div className="training-result-text">
                                <span className="training-result-word">
                                    {word.original}
                                </span>
                                    <span className="training-result-dash">
                                    —
                                </span>
                                    <span className="training-result-translation">
                                    {word.translation}
                                </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="training-buttons">
                    <Link className="training-button exit"
                          to={`/training/${vocabularyId}`}>
                        <div className="training-button-text exit">
                            Exit
                        </div>
                    </Link>
                    <div className="training-button continue"
                    onClick={props.handleReload}>
                        <div className="training-button-text continue">
                            Continue
                        </div>
                        <div className="training-button-icon continue">
                            <IconArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>

    )
}

export default TrainingResults;
