import React from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import './style.scss';
import {learnVocabulary} from "../../store/actions/dictionary";
import IconPlus from "../../icons/IconPlus/IconPlus";
import IconCheckmark from "../../icons/IconCheckmark/IconCheckmark";


function VocabularyTitle(props) {
    const dispatch = useDispatch();
    return (
        <div className="VocabularyTitle">
            {props.image && (
                <img className="VocabularyTitle-Image"
                     src={props.image}
                     alt=""/>
            )}

            <div className="VocabularyTitle-Name">
                {props.title}
            </div>
            { props.fullVocabulary && (
                <Link to={`/dictionary/${props.vocabularyId}`}
                      className="VocabularyTitle-Button VocabularyTitle-Button_blue">
                    <div className="VocabularyTitle-ButtonText">
                        Show all {props.fullVocabulary} words
                    </div>
                </Link>
            )}
            { props.isUserVocabulary && (
                <Link to={`/dictionary/my/${props.vocabularyId}`}
                      className=" VocabularyTitle-Button VocabularyTitle-Button_gray">
                    <IconCheckmark />
                    <div className="VocabularyTitle-ButtonText">
                        My vocabulary
                    </div>
                </Link>
            )}
            { props.isNotUserVocabulary && (
                <div className="VocabularyTitle-Button VocabularyTitle-Button_blue" onClick={() => dispatch(learnVocabulary(props.vocabularyId))}>
                    <IconPlus />
                    <div className="VocabularyTitle-ButtonText">
                        Learn vocabulary
                    </div>
                </div>
            )}
        </div>
    )
}

export default VocabularyTitle;
