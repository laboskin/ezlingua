import React, {useEffect} from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import TrainingResults from "../../components/TrainingResults/TrainingResults";
import TrainingQuiz from "../../components/TrainingQuiz/TrainingQuiz";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {clearTraining, startTraining} from "../../store/actions/training";

function TrainingTranslationWord() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id: vocabularyId} = useParams();
    const trainingName = 'translation-word';

    const currentCourse = useSelector(state => state.user.currentCourse);
    const words = useSelector(state => state.training.words);
    const step = useSelector(state => state.training.step);
    const isAnswered = useSelector(state => state.training.isAnswered);
    const isCompleted = useSelector(state => state.training.isCompleted);

    useEffect(() => {
        dispatch(startTraining(trainingName, vocabularyId));
        return () => {
            dispatch(clearTraining());
        }
    }, [dispatch, vocabularyId, currentCourse]);

    if (!words) {
        return null;
    }
    if (words.length === 0) {
        history.push('/training');
        return null;
    }

    return (
        <MainContainer maxWidth="700px">
            {!isCompleted && (
                <TrainingQuiz
                    title="Translation-word"
                    trainingName={trainingName}
                    vocabularyId={vocabularyId}
                    step={step}
                    totalSteps={words.length}
                    question={words[step-1].translation}
                    answer={words[step-1].original}
                    mistake={words[step-1].mistake}
                    options={words[step-1].options}
                    isAnswered={isAnswered}
                />
            )}
            {isCompleted && (
                <TrainingResults
                    title="Translation-word"
                    trainingName={trainingName}
                    vocabularyId={vocabularyId}
                    words={words}
                />
            )}
        </MainContainer>
    );
}

export default TrainingTranslationWord;
