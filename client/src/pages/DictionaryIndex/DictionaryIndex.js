import React from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {Link} from "react-router-dom";
import './style.scss';
import {ReactComponent as IconAddVocabulary} from './iconAddVocabulary.svg';
import {ReactComponent as IconRemoveVocabulary} from './iconRemoveVocabulary.svg';
import {ReactComponent as IconDictionary} from './iconDictionary.svg';
import {ReactComponent as IconArrowRight} from './iconArrowRight.svg';
import {ReactComponent as IconProgressLowVertical} from './iconProgressLowVertical.svg';
import {ReactComponent as IconProgressLowHorizontal} from './iconProgressLowHorizontal.svg';
import {ReactComponent as IconProgressMiddleVertical} from './iconProgressMiddleVertical.svg';
import {ReactComponent as IconProgressMiddleHorizontal} from './iconProgressMiddleHorizontal.svg';
import {ReactComponent as IconProgressHighVertical} from './iconProgressHighVertical.svg';
import {ReactComponent as IconProgressHighHorizontal} from './iconProgressHighHorizontal.svg';
import imageWordsFromContent from './imageWordsFromContent.png';




function DictionaryIndex() {

    const vocabularyGroups = [
        {
            id: 1,
            name: 'First group'
        },
        {
            id: 2,
            name: 'Second group'
        }
    ];
    const vocabularies = [
        {
            id: 1,
            name: 'One',
            image: 'https://avatars.mds.yandex.net/get-pdb/1927216/8c4d6664-6bd5-4f72-91b9-42c5d21e2b4a/s1200?webp=false',
            groupId: 1
        },
        {
            id: 2,
            name: 'One',
            image: 'https://avatars.mds.yandex.net/get-pdb/1927216/8c4d6664-6bd5-4f72-91b9-42c5d21e2b4a/s1200?webp=false',
            groupId: 2
        },
        {
            id: 3,
            name: 'One',
            image: 'https://avatars.mds.yandex.net/get-pdb/1927216/8c4d6664-6bd5-4f72-91b9-42c5d21e2b4a/s1200?webp=false',
            groupId: 2
        },
        {
            id: 4,
            name: 'One',
            image: 'https://avatars.mds.yandex.net/get-pdb/1927216/8c4d6664-6bd5-4f72-91b9-42c5d21e2b4a/s1200?webp=false',
            groupId: 2
        },
    ];
    const userVocabulariesIds = [
        1, 3
    ];
    const userVocabularies = vocabularies.filter(vocabulary => userVocabulariesIds.includes(vocabulary.id));
    const vocabulariesByGroup = vocabularyGroups.map(group => ({
        vocabularies: vocabularies.filter(v => !userVocabulariesIds.includes(v.id) && v.groupId === group.id),
        ...group
    })).filter(group => group.vocabularies.length !== 0);

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
                            <IconDictionary />
                        </div>
                        <div className="my-words-text">
                            <div className="my-words-count">
                                0 words
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
                                    0 words
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
                                    0 words
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
                                    0 words
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
                    <div className="vocabulary card">
                        <Link to="dictionary/my/-1"
                              className="vocabulary-image">
                            <img src={imageWordsFromContent} alt=""/>
                        </Link>
                        <Link to="dictionary/my/-1"
                              className="vocabulary-text">
                            <div className="vocabulary-title">
                                Words from content
                            </div>
                            <div className="vocabulary-count">
                                0 words
                            </div>
                        </Link>
                    </div>
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
                                            0 words
                                        </div>
                                    </Link>
                                    <div data-vocabulary-id={vocabulary.id}
                                         className="vocabulary-button vocabulary-remove">
                                        <div className="vocabulary-button-icon">
                                            <IconRemoveVocabulary />
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
                vocabulariesByGroup.map(group => (
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
                                                0 words
                                            </div>
                                        </Link>
                                        <div data-vocabulary-id={vocabulary.id}
                                             className="vocabulary-button vocabulary-add">
                                            <div className="vocabulary-button-icon">
                                                <IconAddVocabulary />
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