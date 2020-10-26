import React from 'react';
import './style.scss';
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal
    from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import {Link} from "react-router-dom";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import {useDispatch, useSelector} from "react-redux";
import {setFilterProgress, setFilterText, setFilterTraining} from "../../store/actions/dictionary";
import {useTranslation} from "react-i18next";

function WordsFilters(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const filters = useSelector(state => state.dictionary.filters);

    return (
        <div className="WordsFilters">
            <div className="WordsFilters-Search">
                <input className="WordsFilters-SearchInput"
                       placeholder={t('wordsFilters.search')}
                       value={filters.text}
                       onChange={(e) => dispatch(setFilterText(e.target.value))}/>
            </div>

            <div className="WordsFilters-Group">
                <div className="WordsFilters-Training WordsFilters-Training_active">
                    {filters.training?t('trainingNames.'+filters.training):t('wordsFilters.allTrainings')}
                    <div className="WordsFilters-TrainingPopup">
                        <div className="WordsFilters-TrainingPopupContainer">
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (!filters.training?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining(null))}>
                                <div>{t('wordsFilters.allTrainings')}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='cards'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('cards'))}>
                                <div>{t('trainingNames.cards')}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='constructor'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('constructor'))}>
                                <div>{t('trainingNames.constructor')}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='listening'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('listening'))}>
                                <div>{t('trainingNames.listening')}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='translationWord'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('translationWord'))}>
                                <div>{t('trainingNames.translationWord')}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='wordTranslation'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('wordTranslation'))}>
                                <div>{t('trainingNames.wordTranslation')}</div>
                            </div>
                        </div>
                        <div className="WordsFilters-TrainingPopupTriangle">
                            <div className="WordsFilters-TrainingPopupDiamond"/>
                        </div>
                    </div>

                </div>

                <div className="WordsFilters-Progress">
                    <div className={'WordsFilters-ProgressItem '
                    + (!filters.progress?'WordsFilters-ProgressItem_active':'')
                    + (filters.progress===1?'WordsFilters-ProgressItem_beforeActive':'')}
                         onClick={() => dispatch(setFilterProgress(null))}>
                        {t('wordsFilters.all')}
                    </div>
                    <div className={'WordsFilters-ProgressItem '
                    +(filters.progress===1?'WordsFilters-ProgressItem_active':'')
                    +(filters.progress===2?'WordsFilters-ProgressItem_beforeActive':'')}
                         onClick={() => dispatch(setFilterProgress(1))}>
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressLowHorizontal />
                        </div>
                    </div>
                    <div className={'WordsFilters-ProgressItem '
                    +(filters.progress===2?'WordsFilters-ProgressItem_active':'')
                    +(filters.progress===3?'WordsFilters-ProgressItem_beforeActive':'')}
                         onClick={() => dispatch(setFilterProgress(2))}>
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressMiddleHorizontal />
                        </div>
                    </div>
                    <div className={'WordsFilters-ProgressItem '
                    +(filters.progress===3?'WordsFilters-ProgressItem_active':'')}
                         onClick={() => dispatch(setFilterProgress(3))}>
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressHighHorizontal />
                        </div>
                    </div>
                </div>
            </div>


            <Link to={`/training/${props.vocabularyId || ''}`} className="WordsFilters-LinkTraining">
                <div className="WordsFilters-LinkTrainingText">
                    {t('wordsFilters.training')}
                </div>
                <div className="WordsFilters-LinkTrainingIcon">
                    <IconArrowRight />
                </div>
            </Link>
        </div>
    )
}
export default WordsFilters;
