import React from 'react';
import Header from "../../../components/Header/Header";
import './style.scss';
import MobileNav from "../../../components/MobileNav/MobileNav";


function App(props) {
    return (
        <div className="MainLayout">
            <Header />
            <main className="MainLayout-Main">
                {props.children}
            </main>
            <MobileNav />
        </div>
    )
}

export default App;
