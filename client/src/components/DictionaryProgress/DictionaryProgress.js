import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import IconDictionaryFilled from "../../icons/IconDictionaryFilled/IconDictionaryFilled";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import IconProgressLowVertical from "../../icons/progress/IconProgressLowVertical/IconProgressLowVertical";
import IconProgressMiddleVertical from "../../icons/progress/IconProgressMiddleVertical/IconProgressMiddleVertical";
import IconProgressHighVertical from "../../icons/progress/IconProgressHighVertical/IconProgressHighVertical";
import {useDispatch, useSelector} from "react-redux";
import {clearProgress, loadProgress} from "../../store/actions/dictionary";
import {useTranslation} from "react-i18next";

function DictionaryProgress() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const progress = useSelector(state => state.dictionary.progress);

    useEffect(()=> {
        dispatch(loadProgress());
    }, [dispatch, currentCourse, updated]);
    useEffect(()=> {
        return () => {
            dispatch(clearProgress());
        }
    }, [dispatch, currentCourse]);

    return (
        <div className="DictionaryProgress">
            <div className="DictionaryProgress-Title">
                {t('dictionaryProgress.myDictionary')}
            </div>
            <div className="DictionaryProgress-Cards">
                <Link className="DictionaryProgress-Card DictionaryProgress-Words"
                      to="dictionary/my">
                    <div className="DictionaryProgress-WordsIcon">
                        <IconDictionaryFilled />
                    </div>
                    <div className="DictionaryProgress-WordsText">
                        <div className="DictionaryProgress-WordsCount">
                            {progress?t('dictionaryProgress.pluralWords', {count: progress.new + progress.learning + progress.learned}):'...'}
                        </div>
                        <div className="DictionaryProgress-WordsLink">
                            {t('dictionaryProgress.show')}
                        </div>
                    </div>
                </Link>
                <div className="DictionaryProgress-Card DictionaryProgress-Progress">
                    <div className="DictionaryProgress-Stats">
                        <div className="DictionaryProgress-StatsIcon">
                            <IconProgressLowVertical />
                        </div>
                        <div className="DictionaryProgress-StatsText">
                            <div className="DictionaryProgress-StatsTitle">
                                {t('dictionaryProgress.new')}
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress?t('dictionaryProgress.pluralWords', {count: progress.new}):'...'}
                            </div>
                        </div>
                    </div>
                    <div className="DictionaryProgress-Stats">
                        <div className="DictionaryProgress-StatsIcon">
                            <IconProgressMiddleVertical />
                        </div>
                        <div className="DictionaryProgress-StatsText">
                            <div className="DictionaryProgress-StatsTitle">
                                {t('dictionaryProgress.learning')}
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress?t('dictionaryProgress.pluralWords', {count: progress.learning}):'...'}
                            </div>
                        </div>
                    </div>
                    <div className="DictionaryProgress-Stats">
                        <div className="DictionaryProgress-StatsIcon">
                            <IconProgressHighVertical />
                        </div>
                        <div className="DictionaryProgress-StatsText">
                            <div className="DictionaryProgress-StatsTitle">
                                {t('dictionaryProgress.learned')}
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress?t('dictionaryProgress.pluralWords', {count: progress.learned}):'...'}
                            </div>
                        </div>
                    </div>
                    <Link className="DictionaryProgress-LinkTraining" to="/training">
                        <div className="DictionaryProgress-LinkTrainingText">
                            {t('dictionaryProgress.training')}
                        </div>
                        <div className="DictionaryProgress-LinkTrainingIcon">
                            <IconArrowRight />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DictionaryProgress;