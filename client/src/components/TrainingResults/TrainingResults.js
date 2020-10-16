import React from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import './style.scss';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {useDispatch, useSelector} from "react-redux";
import {startTraining} from "../../store/actions/training";

function TrainingResults() {
    const dispatch = useDispatch();
    const words = useSelector(state => state.training.words);
    const trainingName = useLocation().pathname.split('/')[2];
    const {id: vocabularyId = ''} = useParams();

    let title;
    switch(trainingName) {
        case 'cards':
            title = 'Cards';
            break;
        case 'constructor':
            title = 'Constructor';
            break;
        case 'listening':
            title = 'Listening';
            break;
        case 'translation-word':
            title = 'Translation-word';
            break;
        case 'word-translation':
            title = 'Word-translation';
            break;
    }

    return (
        <div className="TrainingResult">
            <div className="TrainingResult-Title">
                <div className="TrainingResult-Name">
                    {title}
                </div>
            </div>
            <div className="TrainingResult-Card">
                Results
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
                        Exit
                    </div>
                </Link>
                <div className="TrainingResult-Button TrainingResult-Button_continue"
                     onClick={() => dispatch(startTraining(trainingName, vocabularyId))}>
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
