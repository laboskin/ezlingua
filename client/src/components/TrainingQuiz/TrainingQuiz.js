import React, {useEffect} from 'react';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import IconSpeaker from "../../icons/IconSpeaker/IconSpeaker";
import './style.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    answerSkip,
    cardsForceRepeat,
    cardsKnow,
    cardsRepeat, constructorSelect,
    nextStep,
    selectOption, startTraining
} from "../../store/actions/training";
import {useTranslation} from "react-i18next";
import speak from '../../utils/speechkitSpeak';

function TrainingQuiz() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const trainingName = useLocation().pathname.split('/')[2];
    const {id: vocabularyId = ''} = useParams();
    const words = useSelector(state => state.training.words);
    const step = useSelector(state => state.training.step);
    const isAnswered = useSelector(state => state.training.isAnswered);

    useEffect(() => {
        dispatch(startTraining(trainingName, vocabularyId));
    }, [dispatch, trainingName, vocabularyId, currentCourse]);
    useEffect(() => {
        if (words && trainingName === 'listening') {
            speak(words[step-1].original, currentCourse.goalCode);
        }
    })

    if (!words) {
        return null;
    }
    if (words.length === 0) {
        setTimeout(() => history.push('/training/'), 0);
        return null;
    }


    const word = words[step - 1];
    let title;
    switch(trainingName) {
        case 'cards':
            title = t('trainingNames.cards');
            break;
        case 'constructor':
            title = t('trainingNames.constructor');
            break;
        case 'listening':
            title = t('trainingNames.listening');
            break;
        case 'translation-word':
            title = t('trainingNames.translationWord');
            break;
        case 'word-translation':
            title = t('trainingNames.wordTranslation');
            break;
        default:
            return null;
    }


    return (
        <div className="TrainingQuiz">
            <div className="TrainingQuiz-Title">
                <div className="TrainingQuiz-Name">
                    {title}
                </div>
                <div className="TrainingQuiz-Progress">
                    {step}/{words.length}
                </div>
            </div>
            <div className="TrainingQuiz-Card">
                {trainingName === 'cards' && (
                    <React.Fragment>
                        <div className={`TrainingQuiz-Text ${isAnswered?'TrainingQuiz-Text_hasTranslation':'TrainingQuiz-Text_noTranslation'}`}>
                            {word.original}
                        </div>
                        {
                            isAnswered && (
                                <div className="TrainingQuiz-Answer">
                                    {word.translation}
                                </div>
                            )
                        }
                    </React.Fragment>
                )}
                {trainingName === 'constructor' && (
                    <React.Fragment>
                        <div className="TrainingQuiz-Text">
                            {word.translation}
                        </div>
                        <div className="TrainingQuiz-Letters">
                            {
                                word.original.split('').map((letter, idx) => {
                                    if (isAnswered || word.letterGuessed > idx)
                                        return (
                                            <div className="TrainingQuiz-Letter TrainingQuiz-Letter_completed"
                                                 key={letter.text}>
                                                {letter}
                                            </div>
                                        )
                                    if (word.letterGuessed === idx)
                                        return <div className="TrainingQuiz-Letter TrainingQuiz-Letter_next"
                                                    key={letter.text}/>

                                    return <div className="TrainingQuiz-Letter TrainingQuiz-Letter_empty"
                                                key={letter.text}/>;
                                })
                            }
                        </div>
                        <div className="TrainingQuiz-LetterOptions">
                            {
                                word.letterOptions.map(letter => (
                                    <div className={`TrainingQuiz-LetterOption ${letter.count === 0?'TrainingQuiz-LetterOption_empty':''} ${letter.text === word.letterMistake?'TrainingQuiz-LetterOption_wrong':''}`}
                                         onClick={letter.count>0 && (() => dispatch(constructorSelect(letter.text)))}
                                         key={letter.text}>
                                        {letter.text}
                                        {letter.count > 1 && (
                                            <div className="TrainingQuiz-LetterOptionCount">
                                                &times;{letter.count}
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </React.Fragment>
                )}
                {trainingName === 'listening' && (
                    <React.Fragment>
                        {!isAnswered && (
                            <div className="TrainingQuiz-Audio" onClick={() => speak(word.original, currentCourse.goalCode)}>
                                <IconSpeaker />
                            </div>
                        )}
                        {isAnswered && (
                            <div className="TrainingQuiz-Text">
                                {word.translation}
                            </div>
                        )}
                    </React.Fragment>
                )}
                {trainingName === 'translation-word' && (
                    <div className="TrainingQuiz-Text">
                        {word.translation}
                    </div>
                )}
                {trainingName === 'word-translation' && (
                    <div className="TrainingQuiz-Text">
                        {word.original}
                    </div>
                )}
            </div>

            {['listening', 'translation-word', 'word-translation'].includes(trainingName) && (
                <div className="TrainingQuiz-Options">
                    {word.options.map(option => {
                        if (isAnswered)
                            return (
                                <div className={`TrainingQuiz-Option 
                                ${option === word.original || option === word.translation?'TrainingQuiz-Option_correct':''} 
                                ${option === word.mistake?'TrainingQuiz-Option_wrong':''}`}
                                     key={option}>
                                    {option}
                                </div>
                            );
                        return (
                            <div className="TrainingQuiz-Option TrainingQuiz-Option_active" onClick={() => dispatch(selectOption(trainingName, option))}
                                 key={option}>
                                {option}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="TrainingQuiz-Buttons">
                {trainingName === 'cards' && (
                    <React.Fragment>
                        {!isAnswered && (
                            <React.Fragment>
                                <div className="TrainingQuiz-Button TrainingQuiz-Button_wrong" onClick={() => dispatch(cardsRepeat())}>
                                    <div className="TrainingQuiz-ButtonText">
                                        {t('trainingQuiz.iDontKnow')}
                                    </div>
                                </div>
                                <div className="TrainingQuiz-Button TrainingQuiz-Button_correct" onClick={() => dispatch(cardsKnow())}>
                                    <div className="TrainingQuiz-ButtonText">
                                        {t('trainingQuiz.iKnow')}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        {isAnswered && (
                            <React.Fragment>
                                {!word.correct && (
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_forget">
                                        <div className="TrainingQuiz-ButtonText">
                                            {t('trainingQuiz.onRepeat')}
                                        </div>
                                    </div>
                                )}
                                {word.correct && (
                                    <div className="TrainingQuiz-Button TrainingQuiz-Button_repeat" onClick={() => dispatch(cardsForceRepeat())}>
                                        <div className="TrainingQuiz-ButtonText">
                                            {t('trainingQuiz.repeat')}
                                        </div>
                                    </div>
                                )}
                                <div className="TrainingQuiz-Button TrainingQuiz-Button_next" onClick={() => dispatch(nextStep(trainingName))}>
                                    <div className="TrainingQuiz-ButtonText">
                                        {t('trainingQuiz.next')}
                                    </div>
                                    <IconArrowRight />
                                </div>
                            </React.Fragment>
                        )}
                        <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                              to={`/training/${vocabularyId}`}>
                            <div className="TrainingQuiz-ButtonText">
                                {t('trainingQuiz.exit')}
                            </div>
                        </Link>
                    </React.Fragment>
                )}
                {['constructor', 'listening', 'translation-word', 'word-translation'].includes(trainingName) && (
                    <React.Fragment>
                        <Link className="TrainingQuiz-Button TrainingQuiz-Button_exit"
                              to={`/training/${vocabularyId}`}>
                            <div className="TrainingQuiz-ButtonText">
                                {t('trainingQuiz.exit')}
                            </div>
                        </Link>
                        {!isAnswered && (
                            <div className="TrainingQuiz-Button TrainingQuiz-Button_skip" onClick={() => dispatch(answerSkip())}>
                                <div className="TrainingQuiz-ButtonText">
                                    {t('trainingQuiz.skip')}
                                </div>
                            </div>
                        )}
                        {isAnswered && (
                            <div className="TrainingQuiz-Button TrainingQuiz-Button_next" onClick={() => dispatch(nextStep(trainingName))}>
                                <div className="TrainingQuiz-ButtonText">
                                    {t('trainingQuiz.next')}
                                </div>
                                <IconArrowRight />
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default TrainingQuiz;
