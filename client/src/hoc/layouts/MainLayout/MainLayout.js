import React from 'react';
import Header from "../../../components/Header/Header";
import './style.scss';
import Footer from "../../../components/Footer/Footer";


function App(props) {
    return (
        <div className="wrapper">
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default App;
