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

function WordsFilters(props) {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.dictionary.filters);
    const trainingNames = {
        all: 'All trainings',
        cards: 'Cards',
        constructor: 'Constructor',
        listening: 'Listening',
        translationWord: 'Translation-word',
        wordTranslation: 'Word-translation'
    };
    return (
        <div className="WordsFilters">
            <div className="WordsFilters-Search">
                <input className="WordsFilters-SearchInput"
                       placeholder="Search"
                       value={filters.text}
                       onChange={(e) => dispatch(setFilterText(e.target.value))}/>
            </div>

            <div className="WordsFilters-Group">
                <div className="WordsFilters-Training WordsFilters-Training_active">
                    {filters.training?trainingNames[filters.training]:trainingNames.all}
                    <div className="WordsFilters-TrainingPopup">
                        <div className="WordsFilters-TrainingPopupContainer">
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (!filters.training?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining(null))}>
                                <div>{trainingNames.all}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='cards'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('cards'))}>
                                <div>{trainingNames.cards}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='constructor'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('constructor'))}>
                                <div>{trainingNames.constructor}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='listening'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('listening'))}>
                                <div>{trainingNames.listening}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='translationWord'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('translationWord'))}>
                                <div>{trainingNames.translationWord}</div>
                            </div>
                            <div className={'WordsFilters-TrainingPopupItem ' +
                            (filters.training==='wordTranslation'?'WordsFilters-TrainingPopupItem_current':'')}
                                 onClick={() => dispatch(setFilterTraining('wordTranslation'))}>
                                <div>{trainingNames.wordTranslation}</div>
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
                        All
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
                    Training
                </div>
                <div className="WordsFilters-LinkTrainingIcon">
                    <IconArrowRight />
                </div>
            </Link>
        </div>
    )
}
export default WordsFilters;
