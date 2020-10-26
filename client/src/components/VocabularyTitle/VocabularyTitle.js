import React from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import './style.scss';
import {learnVocabulary} from "../../store/actions/dictionary";
import IconPlus from "../../icons/IconPlus/IconPlus";
import IconCheckmark from "../../icons/IconCheckmark/IconCheckmark";
import {useTranslation} from "react-i18next";


function VocabularyTitle(props) {
    const { t } = useTranslation();
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
                        {t('vocabularyTitle.pluralWords', {count: props.fullVocabulary})}
                    </div>
                </Link>
            )}
            { props.isUserVocabulary && (
                <Link to={`/dictionary/my/${props.vocabularyId}`}
                      className=" VocabularyTitle-Button VocabularyTitle-Button_gray">
                    <IconCheckmark />
                    <div className="VocabularyTitle-ButtonText">
                        {t('vocabularyTitle.myVocabulary')}
                    </div>
                </Link>
            )}
            { props.isNotUserVocabulary && (
                <div className="VocabularyTitle-Button VocabularyTitle-Button_blue" onClick={() => dispatch(learnVocabulary(props.vocabularyId))}>
                    <IconPlus />
                    <div className="VocabularyTitle-ButtonText">
                        {t('vocabularyTitle.learnVocabulary')}
                    </div>
                </div>
            )}
        </div>
    )
}

export default VocabularyTitle;
