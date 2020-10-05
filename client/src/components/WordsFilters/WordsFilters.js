import React from 'react';
import './style.scss';
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal
    from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import {Link} from "react-router-dom";
import IconArrowRight from "../../icons/IconArrowRight/IconArrowRight";

function WordsFilters(props) {
    return (
        <div className="WordsFilters">
            <div className="WordsFilters-Search">
                <input className="WordsFilters-SearchInput" placeholder="Search" />
            </div>

            <div className="WordsFilters-Group">
                <div className="WordsFilters-Training WordsFilters-Training_active">
                    All trainings
                    <div className="WordsFilters-TrainingPopup">
                        <div className="WordsFilters-TrainingPopupContainer">
                            <div className="WordsFilters-TrainingPopupItem WordsFilters-TrainingPopupItem_current">
                                <div>All</div>
                            </div>
                            <div className="WordsFilters-TrainingPopupItem">
                                <div>Cards</div>
                            </div>
                            <div className="WordsFilters-TrainingPopupItem">
                                <div>Constructor</div>
                            </div>
                            <div className="WordsFilters-TrainingPopupItem">
                                <div>Listening</div>
                            </div>
                            <div className="WordsFilters-TrainingPopupItem">
                                <div>Translation-word</div>
                            </div>
                            <div className="WordsFilters-TrainingPopupItem">
                                <div>Word-translation</div>
                            </div>
                        </div>
                        <div className="WordsFilters-TrainingPopupTriangle">
                            <div className="WordsFilters-TrainingPopupDiamond"/>
                        </div>
                    </div>

                </div>

                <div className="WordsFilters-Progress">
                    <div className="WordsFilters-ProgressItem">
                        All
                    </div>
                    <div className="WordsFilters-ProgressItem WordsFilters-ProgressItem_beforeActive" >
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressLowHorizontal />
                        </div>
                    </div>
                    <div className="WordsFilters-ProgressItem">
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressMiddleHorizontal />
                        </div>
                    </div>
                    <div className="WordsFilters-ProgressItem">
                        <div className="WordsFilters-ProgressItemIcon">
                            <IconProgressHighHorizontal />
                        </div>
                    </div>
                </div>
            </div>


            <Link to={`/training/${props.vocabularyId || ''}`} className="WordsFilters-LinkTraining">
                <div className="WordsFilters-LinkTrainingText">
                    Training
                </div>
                <div className="WordsFilters-LinkTrainingIcon">
                    <IconArrowRight />
                </div>
            </Link>
        </div>
    )
}
export default WordsFilters;
