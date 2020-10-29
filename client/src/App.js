import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './globalStyles.scss';
import Homepage from "./pages/Homepage/Homepage";
import MainLayout from "./hoc/layouts/MainLayout/MainLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DictionaryIndex from "./pages/DictionaryIndex/DictionaryIndex";
import Settings from "./pages/Settings/Settings";
import DictionaryView from "./pages/DictionaryView/DictionaryView";
import DictionaryMy from "./pages/DictionaryMy/DictionaryMy";
import StoriesPage from "./pages/StoriesPage/StoriesPage";
import StoriesIndex from "./pages/StoriesIndex/StoriesIndex";
import TrainingIndex from "./pages/TrainingIndex/TrainingIndex";
import Modal from "./hoc/Modal/Modal";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import {refresh} from "./store/actions/user";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
    const dispatch = useDispatch();
    const isAuthLoading = useSelector(state => state.user.isAuthLoading);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const isModalVisible = useSelector((state) => state.modal.visible);

    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);

    return !isAuthLoading && (
        <React.Fragment>
            {isAuthenticated && (
                <Switch>
                    {isAdmin && <Route path="/admin" component={AdminPanel}/>}
                    <Route path="/" render={() => (
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

                                <Route path="/settings" component={Settings}/>

                                <Redirect from="/" to="/dictionary"/>
                                <Route path="/" component={ErrorPage}/>
                            </Switch>
                        </MainLayout>
                    )} />
                </Switch>
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
