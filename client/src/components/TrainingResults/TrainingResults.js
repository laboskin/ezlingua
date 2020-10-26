import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useParams} from "react-router-dom";
import './style.scss';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {startTraining} from "../../store/actions/training";
import {useTranslation} from "react-i18next";

function TrainingResults() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const words = useSelector(state => state.training.words);
    const trainingName = useLocation().pathname.split('/')[2];
    const {id: vocabularyId = ''} = useParams();

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
        <div className="TrainingResult">
            <div className="TrainingResult-Title">
                <div className="TrainingResult-Name">
                    {title}
                </div>
            </div>
            <div className="TrainingResult-Card">
                {t('trainingResults.results')}
            </div>
            <div className="TrainingResult-Words">
                {words.map(word => (
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
                ))}
            </div>
            <div className="TrainingResult-Buttons">
                <Link className="TrainingResult-Button TrainingResult-Button_exit"
                      to={`/training/${vocabularyId}`}>
                    <div className="TrainingResult-ButtonText">
                        {t('trainingResults.exit')}
                    </div>
                </Link>
                <div className="TrainingResult-Button TrainingResult-Button_continue"
                     onClick={() => dispatch(startTraining(trainingName, vocabularyId))}>
                    <div className="TrainingResult-ButtonText">
                        {t('trainingResults.continue')}
                    </div>
                    <IconArrowRight />
                </div>
            </div>
        </div>
    )
}

export default TrainingResults;
