import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import TrainingResults from "../../components/TrainingResults/TrainingResults";
import TrainingQuiz from "../../components/TrainingQuiz/TrainingQuiz";
import {clearTraining} from "../../store/actions/training";

function TrainingPage() {
    const dispatch = useDispatch();
    const currentCourse = useSelector(state => state.user.currentCourse);
    const isCompleted = useSelector(state => state.training.isCompleted);

    useEffect(() => {
        return () => {
            dispatch(clearTraining());
        }
    }, [dispatch, currentCourse]);

    return (
        <MainContainer maxWidth="700px">
            {!isCompleted && (
                <TrainingQuiz />
            )}
            {isCompleted && (
                <TrainingResults />
            )}
        </MainContainer>
    );
}


export default TrainingPage;
