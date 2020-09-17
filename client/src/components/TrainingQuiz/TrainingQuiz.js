import React from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {Link, useParams} from "react-router-dom";
import IconSpeaker from "../../icons/IconSpeaker/IconSpeaker";
import './style.scss';

function TrainingQuiz(props) {
    const {id: vocabularyId = ''} = useParams();
    return (
        <div className="TrainingQuiz">
            <div className="TrainingQuiz-Title">
                <div className="TrainingQuiz-Name">
                    {props.title}
                </div>
                <div className="TrainingQuiz-Progress">
                    {props.progress}
                </div>
            </div>
            <div className="TrainingQuiz-Card">
                {
                    ['Translation-word', 'Word-translation'].includes(props.title) && (
                        <div className="TrainingQuiz-Text">
                            {props.question}
                        </div>
                    )
                }
                {
                    props.title === 'Cards' && (
                        <React.Fragment>
                            <div className={`TrainingQuiz-Text ${props.isAnswered?'TrainingQuiz-Text_hasTranslation':'TrainingQuiz-Text_hasTranslation'}`}>
                                {props.question}
                            </div>
                            {
                                props.isAnswered && (
                                    <div className="TrainingQuiz-CardAnswer">
                                        {props.answer}
                                    </div>
                                )
                            }
                        </React.Fragment>

                    )
                }
                {
                    props.title === 'Listening' && (
                        <React.Fragment>
                            <div className="TrainingQuiz-Audio">
                                <IconSpeaker />
                            </div>
                            {
                                props.isAnswered && (
                                    <div className="TrainingQuiz-Text">
                                        {props.answer}
                                    </div>
                                )
                            }
                        </React.Fragment>
                    )
                }
                {
                    props.title === 'Constructor' && (
                        <React.Fragment>
                            <div className="TrainingQuiz-Text">
                                {props.question}
                            </div>
                            <div className="TrainingQuiz-Letters">
                                {
                                    props.answerLetters.map(letter => {

                                    })
                                }
                            </div>
                        </React.Fragment>
                    )
                }
            </div>

            {
                props.title === 'Constructor' && (
                    <div className="TrainingQuiz-LetterOptions">
                        {
                            props.letterOptions.map(letter => (
                                <div className={`TrainingQuiz-LetterOption ${letter.count === 0?'TrainingQuiz-LetterOption_empty':''}`}>
                                    {letter.text}
                                    {
                                        letter.count > 1 && (
                                            <div className="TrainingQuiz-LetterOptionCount">
                                                x{letter.count}
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                ['Listening', 'Translation-word', 'Word-translation'].includes(props.title) && (
                    <div className="TrainingQuiz-Options">
                        {
                            props.isAnswered &&
                            props.options.map(option => (
                                    <div className={
                                        `TrainingQuiz-Option ${option.isCorrect?'TrainingQuiz-Option_correct':(option.isWrong?'TrainingQuiz-Option_wrong':'')}`
                                    }>
                                        {option.text}
                                    </div>
                                )
                            )
                        }
                        {
                            !props.isAnswered &&
                            props.options.map(option => (
                                    <div className="TrainingQuiz-Option TrainingQuiz-Option_active">
                                            {option.text}
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }

            <div className="TrainingQuiz-Buttons">
                {
                    ['Constructor', 'Listening', 'Translation-word', 'Word-translation'].includes(props.title) && (
                        <React.Fragment>
                            <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                                  to={`/training/${vocabularyId}`}>
                                <div className="TrainingQuiz-ButtonText">
                                    Exit
                                </div>
                            </Link>
                            {
                                !props.isAnswered && (
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_skip">
                                        <div className="TrainingQuiz-ButtonText">
                                            skip
                                        </div>
                                    </div>
                                )
                            }
                            {
                                props.isAnswered && (
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_next">
                                        <div className="TrainingQuiz-ButtonText">
                                            Next
                                        </div>
                                        <IconArrowRight />
                                    </div>
                                )
                            }
                        </React.Fragment>
                    )
                }
                {
                    props.title === 'Cards' && (
                        <React.Fragment>
                            {
                                !props.isAnswered && (
                                    <React.Fragment>
                                        <div className="TrainingQuiz-Button TrainingQuiz-Button_wrong">
                                            <div className="TrainingQuiz-ButtonText">
                                                I don't know
                                            </div>
                                        </div>
                                        <div className="TrainingQuiz-Button TrainingQuiz-Button_correct">
                                            <div className="TrainingQuiz-ButtonText">
                                                I know
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            {
                                props.isAnswered && (
                                    <React.Fragment>
                                        {
                                            props.isRepeat && (
                                                <div className="TrainingQuiz-Button TrainingQuiz-Button_forget">
                                                    <div className="TrainingQuiz-ButtonText">
                                                        On repeat
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            !props.isRepeat && (
                                                <div className="TrainingQuiz-Button TrainingQuiz-Button_repeat">
                                                    <div className="TrainingQuiz-ButtonText">
                                                        Repeat
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className="TrainingQuiz-Button TrainingQuiz-Button_next">
                                            <div className="TrainingQuiz-ButtonText">
                                                Next
                                            </div>
                                            <IconArrowRight />
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                                  to={`/training/${vocabularyId}`}>
                                <div className="TrainingQuiz-ButtonText">
                                    Exit
                                </div>
                            </Link>
                        </React.Fragment>
                    )
                }
            </div>

        </div>
    )
}

export default TrainingQuiz;
