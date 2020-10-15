import React from 'react';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {Link} from "react-router-dom";
import IconSpeaker from "../../icons/IconSpeaker/IconSpeaker";
import './style.scss';
import {useDispatch} from "react-redux";
import {
    answerSkip,
    cardsForceRepeat,
    cardsKnow,
    cardsRepeat, constructorSelect,
    nextStep,
    selectOption
} from "../../store/actions/training";

function TrainingQuiz(props) {
    const dispatch = useDispatch();

    return (
        <div className="TrainingQuiz">
            <div className="TrainingQuiz-Title">
                <div className="TrainingQuiz-Name">
                    {props.title}
                </div>
                <div className="TrainingQuiz-Progress">
                    {props.step}/{props.totalSteps}
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
                            <div className={`TrainingQuiz-Text ${props.isAnswered?'TrainingQuiz-Text_hasTranslation':'TrainingQuiz-Text_noTranslation'}`}>
                                {props.question}
                            </div>
                            {
                                props.isAnswered && (
                                    <div className="TrainingQuiz-Answer">
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
                            {!props.isAnswered && (
                                <div className="TrainingQuiz-Audio">
                                    <IconSpeaker />
                                </div>
                            )}
                            {props.isAnswered && (
                                <div className="TrainingQuiz-Text">
                                    {props.answer}
                                </div>
                            )}
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
                                    props.answer.split('').map((letter, idx) => {
                                        if (props.isAnswered || props.letterGuessed > idx)
                                            return (
                                                <div className="TrainingQuiz-Letter TrainingQuiz-Letter_completed">
                                                    {letter}
                                                </div>
                                            )
                                        if (props.letterGuessed === idx)
                                            return <div className="TrainingQuiz-Letter TrainingQuiz-Letter_next" />

                                        return <div className="TrainingQuiz-Letter TrainingQuiz-Letter_empty" />;
                                    })
                                }
                            </div>
                        </React.Fragment>
                    )
                }
                {props.title === 'Constructor' && (
                    <div className="TrainingQuiz-LetterOptions">
                        {
                            props.letterOptions.map(letter => (
                                <div className={`TrainingQuiz-LetterOption ${letter.count === 0?'TrainingQuiz-LetterOption_empty':''} ${letter.text === props.letterMistake?'TrainingQuiz-LetterOption_wrong':''}`}
                                     onClick={letter.count>0 && (() => dispatch(constructorSelect(letter.text)))}>
                                    {letter.text}
                                    {
                                        letter.count > 1 && (
                                            <div className="TrainingQuiz-LetterOptionCount">
                                                &times;{letter.count}
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>

            {['Listening', 'Translation-word', 'Word-translation'].includes(props.title) && (
                <div className="TrainingQuiz-Options">
                    {props.isAnswered &&
                    props.options.map(option => (
                            <div className={`TrainingQuiz-Option ${option===props.answer?'TrainingQuiz-Option_correct':''} ${option===props.mistake?'TrainingQuiz-Option_wrong':''}`}>
                                {option}
                            </div>
                        )
                    )}
                    {!props.isAnswered &&
                    props.options.map(option => (
                            <div className="TrainingQuiz-Option TrainingQuiz-Option_active" onClick={() => dispatch(selectOption(props.trainingName, option))}>
                                {option}
                            </div>
                        )
                    )}
                </div>
            )}

            <div className="TrainingQuiz-Buttons">
                {['Constructor', 'Listening', 'Translation-word', 'Word-translation'].includes(props.title) && (
                    <React.Fragment>
                        <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                              to={`/training/${props.vocabularyId || ''}`}>
                            <div className="TrainingQuiz-ButtonText">
                                Exit
                            </div>
                        </Link>
                        {
                            !props.isAnswered && (
                                <div className="TrainingQuiz-Button TrainingQuiz-Button_skip" onClick={() => dispatch(answerSkip())}>
                                    <div className="TrainingQuiz-ButtonText">
                                        skip
                                    </div>
                                </div>
                            )
                        }
                        {
                            props.isAnswered && (
                                <div className="TrainingQuiz-Button TrainingQuiz-Button_next" onClick={() => dispatch(nextStep(props.trainingName))}>
                                    <div className="TrainingQuiz-ButtonText">
                                        Next
                                    </div>
                                    <IconArrowRight />
                                </div>
                            )
                        }
                    </React.Fragment>
                )}
                {props.title === 'Cards' && (
                    <React.Fragment>
                        {
                            !props.isAnswered && (
                                <React.Fragment>
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_wrong" onClick={() => dispatch(cardsRepeat())}>
                                        <div className="TrainingQuiz-ButtonText">
                                            I don't know
                                        </div>
                                    </div>
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_correct" onClick={() => dispatch(cardsKnow())}>
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
                                            <div className="TrainingQuiz-Button TrainingQuiz-Button_repeat" onClick={() => dispatch(cardsForceRepeat())}>
                                                <div className="TrainingQuiz-ButtonText">
                                                    Repeat
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_next" onClick={() => dispatch(nextStep(props.trainingName))}>
                                        <div className="TrainingQuiz-ButtonText">
                                            Next
                                        </div>
                                        <IconArrowRight />
                                    </div>
                                </React.Fragment>
                            )
                        }
                        <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                              to={`/training/${props.vocabularyId}`}>
                            <div className="TrainingQuiz-ButtonText">
                                Exit
                            </div>
                        </Link>
                    </React.Fragment>
                )}
            </div>

        </div>
    )
}

export default TrainingQuiz;
