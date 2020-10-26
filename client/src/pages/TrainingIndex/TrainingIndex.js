import React, {useEffect} from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import IconTrainingCards from "../../icons/trainings/IconTrainingCards/IconTrainingCards";
import IconTrainingConstructor from "../../icons/trainings/IconTrainingConstructor/IconTrainingConstructor";
import IconTrainingListening from "../../icons/trainings/IconTrainingListening/IconTrainingListening";
import IconTrainingTranslationWord from "../../icons/trainings/IconTrainingTranslationWord/IconTrainingTranslationWord";
import IconTrainingWordTranslation from "../../icons/trainings/IconTrainingWordTranslation/IconTrainingWordTranslation";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {
    clearAvailableVocabularies,
    clearCount,
    loadAvailableVocabularies,
    loadCount
} from "../../store/actions/training";
import Select from "react-select";
import {useTranslation} from "react-i18next";

function TrainingIndex() {
    const { t } = useTranslation();
    const {id: vocabularyId} = useParams();
    const currentCourse = useSelector(state => state.user.currentCourse);
    const history = useHistory();
    const dispatch = useDispatch();
    const count = useSelector(state => state.training.count);
    const availableVocabularies = useSelector(state => state.training.availableVocabularies);
    useEffect(() => {
        dispatch(loadCount(vocabularyId));
        dispatch(loadAvailableVocabularies())
        return () => {
            dispatch(clearCount());
            dispatch(clearAvailableVocabularies())
        }
    }, [dispatch, vocabularyId, currentCourse]);

    if (!count || !availableVocabularies)
        return null;
    if (vocabularyId && !availableVocabularies.find(vocabulary => vocabulary.id === vocabularyId)) {
        history.replace('/training/');
        return null;
    }

    const trainings = [
        {
            name: t('trainingNames.wordTranslation'),
            count: count.trainingWordTranslation,
            link: '/training/word-translation/',
            icon: <IconTrainingWordTranslation />
        },
        {
            name: t('trainingNames.translationWord'),
            count: count.trainingTranslationWord,
            link: '/training/translation-word/',
            icon: <IconTrainingTranslationWord />
        },
        {
            name: t('trainingNames.cards'),
            count: count.trainingCards,
            link: '/training/cards/',
            icon: <IconTrainingCards />
        },
        {
            name: t('trainingNames.constructor'),
            count: count.trainingConstructor,
            link: '/training/constructor/',
            icon: <IconTrainingConstructor />
        },
        {
            name: t('trainingNames.listening'),
            count: count.trainingListening,
            link: '/training/listening/',
            icon: <IconTrainingListening />,
            large: true
        },

    ];
    const selectOptions = [
        {value: undefined, label: t('trainingIndex.allVocabularies')},
        ...availableVocabularies.map(v => ({value: v.id, label: v.name}))
    ];

    return (
        <MainContainer maxWidth="700px">
            <div className="TrainingIndex-Title">
                <div className="TrainingIndex-TitleName">
                    { t('trainingIndex.training')}
                </div>
                <div className="TrainingIndex-TitleFilter">
                    <Select
                        options={selectOptions}
                            defaultValue={selectOptions.find(option => option.value === vocabularyId)}
                            onChange={e => history.push(`/training/${e.value}`)}
                    />
                </div>
            </div>

            <div className="TrainingIndex-Cards">
                {trainings.map(training => {
                    if (training.count)
                        return (
                            <Link className={`TrainingIndex-Card ${training.large?'TrainingIndex-Card_large':''}`}
                                  to={training.link + (vocabularyId || '')}
                                  key={training.name}>
                                <div className="TrainingIndex-CardText">
                                    <div className="TrainingIndex-CardTitle">
                                        {training.name}
                                    </div>
                                    <div className="TrainingIndex-CardCount">
                                        {t('trainingIndex.pluralWords', {count: training.count})}
                                    </div>
                                </div>
                                <div className="TrainingIndex-CardIcon">
                                    {training.icon}
                                </div>
                            </Link>
                        )
                    else return (
                        <div className={`TrainingIndex-Card ${training.large?'TrainingIndex-Card_large':''}`}>
                            <div className="TrainingIndex-CardText">
                                <div className="TrainingIndex-CardTitle">
                                    {training.name}
                                </div>
                                <div className="TrainingIndex-CardCount">
                                    {t('trainingIndex.pluralWords', {count: training.count})}
                                </div>
                            </div>
                            <div className="TrainingIndex-CardIcon">
                                {training.icon}
                            </div>
                        </div>
                    )
                })}
            </div>
        </MainContainer>
    )
}

export default TrainingIndex;
