import React from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import IconPlus from "../../icons/IconPlus/IconPlus";
import {useDispatch} from "react-redux";
import {learnVocabulary, removeVocabulary} from "../../store/actions/dictionary";
import {useTranslation} from "react-i18next";

function VocabularyCard(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const link = `/dictionary/${props.isUserVocabulary?'my/':''}${props.vocabularyId}`;

    if (props.hidden)
        return <div className="VocabularyCard VocabularyCard_hidden"/>;

    return (
        <div className="VocabularyCard">
            <Link to={link}
                  className="VocabularyCard-Image">
                <img src={props.vocabularyImage}
                     alt=""/>
            </Link>
            <Link to={link}
                  className="VocabularyCard-Text">
                <div className="VocabularyCard-Title">
                    {props.vocabularyName}
                </div>
                <div className="VocabularyCard-Count">
                    {t('vocabularyCard.pluralWords', {count: props.vocabularyCount})}
                </div>
            </Link>
            {props.isUserVocabulary && (
                <div className="VocabularyCard-Button VocabularyCard-Button_remove"
                     onClick={() => dispatch(removeVocabulary(props.vocabularyId))}>
                    <div className="VocabularyCard-ButtonIcon">
                        <IconPlus />
                    </div>
                    <div className="VocabularyCard-ButtonText">
                        {t('vocabularyCard.remove')}
                    </div>
                </div>
            )}
            {!props.isUserVocabulary && (
                <div className="VocabularyCard-Button VocabularyCard-Button_learn"
                     onClick={() => dispatch(learnVocabulary(props.vocabularyId))}>
                    <div className="VocabularyCard-ButtonIcon">
                        <IconPlus />
                    </div>
                    <div className="VocabularyCard-ButtonText">
                        {t('vocabularyCard.learn')}
                    </div>
                </div>
            )}
        </div>
    )
}

export default VocabularyCard;