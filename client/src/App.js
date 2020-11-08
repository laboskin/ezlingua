import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './globalStyles.scss';
import Homepage from "./pages/Homepage/Homepage";
import MainLayout from "./hoc/layouts/MainLayout/MainLayout";
import DictionaryIndex from "./pages/DictionaryIndex/DictionaryIndex";
import DictionaryView from "./pages/DictionaryView/DictionaryView";
import DictionaryMy from "./pages/DictionaryMy/DictionaryMy";
import TrainingIndex from "./pages/TrainingIndex/TrainingIndex";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import StoriesIndex from "./pages/StoriesIndex/StoriesIndex";
import StoriesPage from "./pages/StoriesPage/StoriesPage";
import Modal from "./hoc/Modal/Modal";
import {refresh} from "./store/actions/user";

function App() {
    const dispatch = useDispatch();
    const isAuthLoading = useSelector(state => state.user.isAuthLoading);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isModalVisible = useSelector((state) => state.modal.visible);

    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);

    return !isAuthLoading && (
        <React.Fragment>
            {isAuthenticated && (
                <MainLayout>
                    <Switch>
                        <Route path="/dictionary/my/:id?" component={DictionaryMy}/>
                        <Route path="/dictionary/:id" component={DictionaryView}/>
                        <Route path="/dictionary" component={DictionaryIndex}/>

                        <Route path="/stories/:id" component={StoriesPage}/>
                        <Route path="/stories" component={StoriesIndex}/>

                        <Route path="/training/cards/:id?" component={TrainingPage}/>
                        <Route path="/training/constructor/:id?" component={TrainingPage}/>
                        <Route path="/training/listening/:id?" component={TrainingPage}/>
                        <Route path="/training/translation-word/:id?" component={TrainingPage}/>
                        <Route path="/training/word-translation/:id?" component={TrainingPage}/>
                        <Route path="/training/:id?" component={TrainingIndex}/>

                        <Redirect to="/dictionary"/>
                    </Switch>
                </MainLayout>
            )}
            {!isAuthenticated && (
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Redirect to="/" />
                </Switch>
            )}
            {isModalVisible && <Modal />}
        </React.Fragment>
    )
}

export default App;
