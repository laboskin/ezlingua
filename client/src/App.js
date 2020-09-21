import React from 'react';
import './globalStyles.scss';
import Homepage from "./pages/Homepage/Homepage";
import {Switch, Route, Redirect} from "react-router-dom";
import MainLayout from "./hoc/layouts/MainLayout/MainLayout";
import Noop from "./components/Noop";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DictionaryIndex from "./pages/DictionaryIndex/DictionaryIndex";
import Settings from "./pages/Settings/Settings";
import DictionaryView from "./pages/DictionaryView/DictionaryView";
import DictionaryMy from "./pages/DictionaryMy/DictionaryMy";
import ContentView from "./pages/ContentView/ContentView";
import ContentIndex from "./pages/ContentIndex/ContentIndex";
import TrainingWordTranslation from "./pages/TrainingWordTranslation/TrainingWordTranslation";
import TrainingTranslationWord from "./pages/TrainingTranslationWord/TrainingTranslationWord";
import TrainingCards from "./pages/TrainingCards/TrainingCards";
import TrainingConstructor from "./pages/TrainingConstructor/TrainingConstructor";
import TrainingListening from "./pages/TrainingListening/TrainingListening";
import TrainingIndex from "./pages/TrainingIndex/TrainingIndex";
import Modal from "./hoc/Modal/Modal";
import {useSelector} from "react-redux";
import {useAuth} from "./hooks/authHook";


function App() {
    const isLoading = useAuth();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isModalVisible = useSelector((state) => state.modal.visible);

    if (isLoading) return null;

    return (
        <React.Fragment>
            {isAuthenticated && (
                <MainLayout>
                    <Switch >
                        <Route path="/dictionary/my/:id?" component={DictionaryMy}/>
                        <Route path="/dictionary/:id" component={DictionaryView}/>
                        <Route path="/dictionary" component={DictionaryIndex}/>

                        <Route path="/content/:id" component={ContentView}/>
                        <Route path="/content" component={ContentIndex}/>

                        <Route path="/training/word-translation/:id?" component={TrainingWordTranslation}/>
                        <Route path="/training/translation-word/:id?" component={TrainingTranslationWord}/>
                        <Route path="/training/cards/:id?" component={TrainingCards}/>
                        <Route path="/training/constructor/:id?" component={TrainingConstructor}/>
                        <Route path="/training/listening/:id?" component={TrainingListening}/>
                        <Route path="/training" component={TrainingIndex}/>

                        <Route path="/settings" component={Settings}/>

                        <Redirect from="/" to="/dictionary" component={Noop}/>
                        <Route path="/" component={ErrorPage}/>
                    </Switch>
                </MainLayout>
            )}

            {!isAuthenticated && <Homepage />}
            {isModalVisible && <Modal />}
        </React.Fragment>
    )
}

export default App;
