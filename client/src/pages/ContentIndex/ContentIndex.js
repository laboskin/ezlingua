import React from 'react';
import './style.scss';
import doneIcon from './doneIcon.svg';
import {ReactSVG} from "react-svg";
import {Link} from "react-router-dom";

function ContentIndex() {

    const contentList = [
        {
            id: 1,
            name: "Corn",
            image: "https://lifetambov.ru/assets/images/tickets/%D0%A1%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8C2019/%D0%BA%D1%83%D0%BA%D1%83.jpg",
            done: true
        }
    ];

    return (
        <div className="main-container">
            <div className="page-title">
                <div className="page-name">
                    <div className="page-name-text">
                        Content
                    </div>
                </div>
            </div>
            <div className="content-list">
                <div className="items-grid">
                    {
                        contentList.map(content => {
                            return (
                                <Link to={`/content/${content.id}`} className="content">
                                    <div className="content-image">
                                        <img src={content.image} alt=""/>
                                    </div>
                                    <div className="content-text">
                                        {
                                            content.done && (
                                                <div className="content-icon">
                                                    <ReactSVG src={doneIcon} />
                                                </div>
                                            )
                                        }
                                        {content.name}
                                    </div>
                                </Link>
                            )
                        })
                    }
                    {/*<?php if (!empty($q) and $q!=$content['complexity']) continue ?>*/}


                    <div className="hidden-content"/>
                    <div className="hidden-content"/>
                    <div className="hidden-content"/>
                    <div className="hidden-content"/>
                    <div className="hidden-content"/>


                </div>
            </div>
        </div>
    )
}

export default ContentIndex;
