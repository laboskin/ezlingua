import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import IconTrainingCards from "../../icons/trainings/IconTrainingCards/IconTrainingCards";
import IconTrainingConstructor from "../../icons/trainings/IconTrainingConstructor/IconTrainingConstructor";
import IconTrainingListening from "../../icons/trainings/IconTrainingListening/IconTrainingListening";
import IconTrainingTranslationWord from "../../icons/trainings/IconTrainingTranslationWord/IconTrainingTranslationWord";
import IconTrainingWordTranslation from "../../icons/trainings/IconTrainingWordTranslation/IconTrainingWordTranslation";

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
                            <IconTrainingWordTranslation />
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
                            <IconTrainingTranslationWord />
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
                            <IconTrainingCards />
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
                            <IconTrainingConstructor />

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
                            <IconTrainingListening />
                        </div>
                    </Link>

                </div>
            </div>


        </div>
    )
}

export default TrainingIndex;