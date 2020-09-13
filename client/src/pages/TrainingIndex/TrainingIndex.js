import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import iconCards from './iconCards.svg';
import iconWordTranslation from './iconWordTranslation.svg';
import iconTranslationWord from './iconTranslationWord.svg';
import iconConstructor from './iconConstructor.svg';
import iconListening from './iconListening.svg';
import {ReactSVG} from "react-svg";

function TrainingIndex() {

    return (
        <div className="main-container">
            <div className="page-title">
                <div className="page-name">
                    <div className="page-name-text">Training</div>
                </div>
                <div className="page-filter">
                    {/*<?= Html::beginForm('/training/', 'get', [
                    ]); ?>
                    <?= Html::dropDownList('v', Yii::$app->request->get('v'), \app\models\UserVocabulary::getUserVocabularySelect(), [
                        'class'=> 'form-control',
                        'onchange' => '$(this).closest("form").submit();',
                        'prompt' => Yii::t('trainingIndex', 'All vocabularies')
                    ]); ?>
                    <?= Html::endForm(); ?>*/}
                </div>
            </div>

            <div className="section">
                <div className="section-grid">
                    <Link className="training"
                       to="training/word-translation">
                        <div className="training-text">
                            <div className="training-title">
                                Word-translation
                            </div>
                            <div className="training-count">
                                0 words
                                {/*<?= Yii::t(
                                    'trainingIndex',
                                    '{n, plural, =0{Not enough words} =1{# word} one{# words} few{# words} many{# words} other{# words}}',
                                    ['n' => $countWordTranslation])
                                ?>*/}
                            </div>
                        </div>
                        <div className="training-icon">
                            <ReactSVG src={iconWordTranslation} />
                        </div>
                    </Link>
                    <Link className="training"
                       to="training/translation-word">
                        <div className="training-text">
                            <div className="training-title">
                                Translation-Word
                            </div>
                            <div className="training-count">
                                0 words
                            </div>
                        </div>
                        <div className="training-icon">
                            <ReactSVG src={iconTranslationWord}/>
                        </div>
                    </Link>
                    <Link className="training"
                       to="training/cards">
                        <div className="training-text">
                            <div className="training-title">
                                Cards
                            </div>
                            <div className="training-count">
                                0 words
                            </div>
                        </div>
                        <div className="training-icon">
                            <ReactSVG src={iconCards} />
                        </div>
                    </Link>
                    <Link className="training"
                       to="training/constructor">
                        <div className="training-text">
                            <div className="training-title">
                                Constructor
                            </div>
                            <div className="training-count">
                                0 words
                            </div>
                        </div>
                        <div className="training-icon">
                            <ReactSVG src={iconConstructor} />

                        </div>
                    </Link>
                    <Link className="training training-large"
                       to="training/audio">
                        <div className="training-text">
                            <div className="training-title">
                                Listening
                            </div>
                            <div className="training-count">
                                0 words
                            </div>
                        </div>
                        <div className="training-icon">
                            <ReactSVG src={iconListening} />
                        </div>
                    </Link>

                </div>
            </div>


        </div>
    )
}

export default TrainingIndex;
