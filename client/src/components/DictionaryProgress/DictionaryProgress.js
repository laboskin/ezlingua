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

function DictionaryProgress() {
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

    if (!progress) return null;

    return (
        <div className="DictionaryProgress">
            <div className="DictionaryProgress-Title">
                <div className="DictionaryProgress-TitleName">
                    My dictionary
                </div>
            </div>
            <div className="DictionaryProgress-Cards">
                <Link className="DictionaryProgress-Card DictionaryProgress-Words"
                      to="dictionary/my">
                    <div className="DictionaryProgress-WordsIcon">
                        <IconDictionaryFilled />
                    </div>
                    <div className="DictionaryProgress-WordsText">
                        <div className="DictionaryProgress-WordsCount">
                            {progress.new + progress.learning + progress.learned} words
                        </div>
                        <div className="DictionaryProgress-WordsLink">
                            Show
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
                                New
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress.new} words
                            </div>
                        </div>
                    </div>
                    <div className="DictionaryProgress-Stats">
                        <div className="DictionaryProgress-StatsIcon">
                            <IconProgressMiddleVertical />
                        </div>
                        <div className="DictionaryProgress-StatsText">
                            <div className="DictionaryProgress-StatsTitle">
                                Learning
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress.learning} words
                            </div>
                        </div>
                    </div>
                    <div className="DictionaryProgress-Stats">
                        <div className="DictionaryProgress-StatsIcon">
                            <IconProgressHighVertical />
                        </div>
                        <div className="DictionaryProgress-StatsText">
                            <div className="DictionaryProgress-StatsTitle">
                                Learned
                            </div>
                            <div className="DictionaryProgress-StatsCount">
                                {progress.learned} words
                            </div>
                        </div>
                    </div>
                    <Link className="DictionaryProgress-LinkTraining" to="/training">
                        <div className="DictionaryProgress-LinkTrainingText">
                            Training
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