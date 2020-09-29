import React, {useEffect} from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {Link} from "react-router-dom";
import './style.scss';
import IconPlus from "../../icons/IconPlus/IconPlus";
import IconDictionaryFilled from "../../icons/IconDictionaryFilled/IconDictionaryFilled";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import IconProgressLowVertical from "../../icons/progress/IconProgressLowVertical/IconProgressLowVertical";
import IconProgressMiddleVertical from "../../icons/progress/IconProgressMiddleVertical/IconProgressMiddleVertical";
import IconProgressHighVertical from "../../icons/progress/IconProgressHighVertical/IconProgressHighVertical";
import {useDispatch, useSelector} from "react-redux";
import {clearProgress, clearVocabularies, loadProgress, loadVocabularies} from "../../store/actions/dictionary";

function DictionaryIndex() {
    const dispatch = useDispatch();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const vocabularyGroups = useSelector(state => state.dictionary.vocabularyGroups);
    const userVocabularies = useSelector(state => state.dictionary.userVocabularies);
    const progress = useSelector(state => state.dictionary.progress);
    useEffect(()=> {
        dispatch(loadVocabularies());
        dispatch(loadProgress());
        return () => {
            dispatch(clearVocabularies());
            dispatch(clearProgress());
        }
    }, [dispatch, currentCourse]);

    if (!userVocabularies || !vocabularyGroups || !progress) return null;

    return (
        <MainContainer maxWidth="1000px">
            <div className="page-title">
                <div className="page-name">
                    <div className="page-name-text">
                        My dictionary
                    </div>
                </div>
            </div>
            <div className="section section-my-words">
                <div className="section-grid">
                    <Link className="my-words card"
                          to="dictionary/my">
                        <div className="my-words-icon">
                            <IconDictionaryFilled />
                        </div>
                        <div className="my-words-text">
                            <div className="my-words-count">
                                {progress.new + progress.learning + progress.learned} words
                            </div>
                            <div className="my-words-link">
                                Show
                            </div>
                        </div>
                    </Link>
                    <div className="my-progress card">
                        <div className="my-progress-words">
                            <div className="my-progress-words-icon">
                                <IconProgressLowVertical />
                            </div>
                            <div className="my-progress-words-icon my-progress-words-icon-mobile">
                                <IconProgressLowHorizontal />
                            </div>
                            <div className="my-progress-words-text">
                                <div className="my-progress-words-title">
                                    New
                                </div>
                                <div className="my-progress-words-count">
                                    {progress.new} words
                                </div>
                            </div>
                        </div>
                        <div className="my-progress-words">
                            <div className="my-progress-words-icon">
                                <IconProgressMiddleVertical />
                            </div>
                            <div className="my-progress-words-icon my-progress-words-icon-mobile">
                                <IconProgressMiddleHorizontal />
                            </div>
                            <div className="my-progress-words-text">
                                <div className="my-progress-words-title">
                                    Learning
                                </div>
                                <div className="my-progress-words-count">
                                    {progress.learning} words
                                </div>
                            </div>
                        </div>
                        <div className="my-progress-words">
                            <div className="my-progress-words-icon">
                                <IconProgressHighVertical />
                            </div>
                            <div className="my-progress-words-icon my-progress-words-icon-mobile">
                                <IconProgressHighHorizontal />
                            </div>
                            <div className="my-progress-words-text">
                                <div className="my-progress-words-title">
                                    Learned
                                </div>
                                <div className="my-progress-words-count">
                                    {progress.learned} words
                                </div>
                            </div>
                        </div>
                        <Link className="my-progress-training" to="/training">
                            <div className="my-progress-training-text">
                                Training
                            </div>
                            <div className="my-progress-training-icon">
                                <IconArrowRight />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section section-my-vocabularies">
                <div className="section-title">
                    <div className="section-name">
                        My vocabularies
                    </div>
                </div>
                <div className="section-grid">
                    {
                        userVocabularies.map(vocabulary => (
                                <div key={vocabulary.id} className="vocabulary card">
                                    <Link to={`dictionary/my/${vocabulary.id}`}
                                          className="vocabulary-image">
                                        <img src={vocabulary.image}
                                             alt=""/>
                                    </Link>
                                    <Link to={`dictionary/my/${vocabulary.id}`}
                                          className="vocabulary-text">
                                        <div className="vocabulary-title">
                                            {vocabulary.name}
                                        </div>
                                        <div className="vocabulary-count">
                                            {vocabulary.count} words
                                        </div>
                                    </Link>
                                    <div data-vocabulary-id={vocabulary.id}
                                         className="vocabulary-button vocabulary-remove">
                                        <div className="vocabulary-button-icon">
                                            <IconPlus />
                                        </div>
                                        <div className="vocabulary-button-text">
                                            Remove
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                    <div className="hidden-vocabulary"/>
                    <div className="hidden-vocabulary"/>
                    <div className="hidden-vocabulary"/>
                    <div className="hidden-vocabulary"/>
                    <div className="hidden-vocabulary"/>
                </div>
            </div>
            {
                vocabularyGroups.map(group => (
                    <div key={group.id} className="section">
                        <div className="section-title">
                            <div className="section-name">
                                {group.name}
                            </div>
                        </div>
                        <div className="section-grid">
                            {
                                group.vocabularies.map(vocabulary => (
                                    <div key={vocabulary.id} className="vocabulary card">
                                        <Link to={`dictionary/${vocabulary.id}`}
                                              className="vocabulary-image">
                                            <img src={vocabulary.image} alt=""/>
                                        </Link>
                                        <Link to={`dictionary/${vocabulary.id}`}
                                              className="vocabulary-text">
                                            <div className="vocabulary-title">
                                                {vocabulary.name}
                                            </div>
                                            <div className="vocabulary-count">
                                                {vocabulary.count} words
                                            </div>
                                        </Link>
                                        <div data-vocabulary-id={vocabulary.id}
                                             className="vocabulary-button vocabulary-add">
                                            <div className="vocabulary-button-icon">
                                                <IconPlus />
                                            </div>
                                            <div className="vocabulary-button-text">
                                                Learn
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="hidden-vocabulary"/>
                            <div className="hidden-vocabulary"/>
                            <div className="hidden-vocabulary"/>
                            <div className="hidden-vocabulary"/>
                            <div className="hidden-vocabulary"/>

                        </div>
                    </div>
                ))
            }
        </MainContainer>
    )
}

export default DictionaryIndex;