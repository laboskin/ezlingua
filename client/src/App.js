import React from 'react';
import Homepage from "./pages/Homepage/Homepage";
import {Switch, Route, Redirect} from "react-router-dom";
import MainLayout from "./hoc/layouts/MainLayout/MainLayout";
import Noop from "./components/Noop";
import ErrorPage from "./pages/ErrorPage/ErrorPage";


function App() {
    const isAuthenticated = true;


    if (!isAuthenticated)
        return <Homepage />
    return (
        <MainLayout>
            <Switch >
                <Route path="/content" component={Noop}/>
                <Route path="/training" component={Noop}/>
                <Route path="/dictionary" component={Noop}/>
                <Redirect from="/" to="/dictionary" component={Noop}/>
                <Route path="/" component={ErrorPage}/>
            </Switch>
        </MainLayout>
    )

}

export default App;
