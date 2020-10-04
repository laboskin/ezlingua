 import React, {useEffect} from 'react';
 import {useDispatch, useSelector} from "react-redux";
 import {Link, useParams} from "react-router-dom";
 import './style.scss';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import IconGoBack from "../../icons/IconGoBack/IconGoBack";
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import WordsTable from "../../components/WordsTable/WordsTable";
 import {clearUserVocabulary, clearUserWords, loadUserVocabulary, loadUserWords} from "../../store/actions/dictionary";


function DictionaryMy() {
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const { id: vocabularyId } = useParams();

    const userWords = useSelector(state => state.dictionary.userWords);
    const userVocabulary = useSelector(state => state.dictionary.userVocabulary);

    useEffect(() => {
        if (vocabularyId)
            dispatch(loadUserVocabulary(vocabularyId));
        else
            dispatch(loadUserWords())
    }, [dispatch, currentCourse, updated, vocabularyId]);

    useEffect(() => {
        return () => {
            if (vocabularyId)
                dispatch(clearUserVocabulary());
            else
                dispatch(clearUserWords())
        }
    }, [dispatch, currentCourse, vocabularyId]);


    if (vocabularyId && !userVocabulary) return null;
    if (!vocabularyId && !userWords) return null;

    const words = vocabularyId?userVocabulary.words:userWords;

    return (
        <MainContainer maxWidth="900px">
            <div className="page-title">
                <div className="page-back">
                    <Link to="/dictionary" className="page-back-icon">
                        <IconGoBack />
                    </Link>
                </div>
                {userVocabulary && (
                    <div className="page-image">
                        <img src={userVocabulary.image} alt=""/>
                    </div>
                )}
                <div className="page-name">
                    <div className="page-name-text">
                        <span>{`My vocabulary${userVocabulary?`: ${userVocabulary.name}`:''}`}</span> - {`${words.length} words`}
                    </div>
                </div>
                {
                    userVocabulary && userVocabulary.fullVocabulary && (
                        <Link to={`/dictionary/${vocabularyId}`}
                              className="page-vocabulary-add">
                            <div className="page-vocabulary-add-text">
                                Show all {userVocabulary.fullVocabulary} words
                            </div>
                        </Link>
                    )
                }
            </div>
            <div className="page-filter">
                <div className="words-search">
                    <input name="word-search-input" placeholder="Search" />
                </div>
                <div className="words-filters">
                    <div className="training-filter training-filter-active">
                        All trainings
                        <div className="training-filter-popup">
                            <div className="training-filter-popup-container">
                                <div className="training-filter-popup-item-current">
                                    <div>All</div>
                                </div>
                                <div data-training="Cards"
                                     className="training-filter-popup-item">
                                    <div>Cards</div>
                                </div>
                                <div data-training="Constructor"
                                     className="training-filter-popup-item">
                                    <div>Constructor</div>
                                </div>
                                <div data-training="Listening"
                                     className="training-filter-popup-item">
                                    <div>Listening</div>
                                </div>
                                <div data-training="Translation-word"
                                     className="training-filter-popup-item">
                                    <div>Translation-word</div>
                                </div>
                                <div data-training="Word-translation"
                                     className="training-filter-popup-item">
                                    <div>Word-translation</div>
                                </div>
                            </div>
                            <div className="training-filter-popup-triangle">
                                <div className="training-filter-popup-diamond"/>
                            </div>
                        </div>

                    </div>
                    <div className="progress-filter">
                        <div className="progress-filter-item">
                            All
                        </div>
                        <div className="progress-filter-item progress-filter-item-before-active" >
                            <div className="progress-filter-item-icon">
                                <IconProgressLowHorizontal />
                            </div>
                        </div>
                        <div className="progress-filter-item progress-filter-item-active">
                            <div className="progress-filter-item-icon">
                                <IconProgressMiddleHorizontal />
                            </div>
                        </div>
                        <div className="progress-filter-item">
                            <div className="progress-filter-item-icon">
                                <IconProgressHighHorizontal />
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/training/${vocabularyId || ''}`} className="words-training">
                    <div className="words-training-text">
                        Training
                    </div>
                    <div className="words-training-icon">
                        <IconArrowRight />
                    </div>
                </Link>
            </div>
            <WordsTable words={words} />
        </MainContainer>
    )
}

export default DictionaryMy;
