import React from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import './style.scss';
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";
import IconGoBack from "../../icons/IconGoBack/IconGoBack";
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import {Link} from "react-router-dom";
import WordsTable from "../../components/WordsTable/WordsTable";

function DictionaryMy() {

    const words = [
        {
            original: 'original',
            translation: 'translation',
            vocabularyId: 1,
            vocabularyName: 'Vocabulary'
        }
    ];

    return (
        <MainContainer maxWidth="900px">
            <div className="page-title">
                <div className="page-back">
                    <Link to="/dictionary" className="page-back-icon">
                        <IconGoBack />
                    </Link>
                </div>
                {/*<div className="page-image">
                    <img src={vocabularyImage} alt=""/>
                </div>*/}
                <div className="page-name">
                    <div className="page-name-text">
                        My vocabulary: 0 words
                    </div>
                </div>
                {/*<Link to={`dictionary /${vocabularyId}`}
                   className="page-vocabulary-add">
                    <div className="page-vocabulary-add-text">
                        Show all 100 words
                    </div>
                </Link>*/}
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
                                <div data-training="Word-translation"
                                     className="training-filter-popup-item">
                                    <div>Word-translation</div>
                                </div>
                                <div data-training="Translation-word"
                                     className="training-filter-popup-item">
                                    <div>Translation-word</div>
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
                <Link to="/training/" className="words-training">
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
