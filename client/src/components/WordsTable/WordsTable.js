import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import IconProgressHighHorizontal from "../../icons/progress/IconProgressHighHorizontal/IconProgressHighHorizontal";
import IconTrash from "../../icons/IconTrash/IconTrash";
import IconSpeaker from "../../icons/IconSpeaker/IconSpeaker";
import IconProgressLowHorizontal from "../../icons/progress/IconProgressLowHorizontal/IconProgressLowHorizontal";
import IconProgressMiddleHorizontal
    from "../../icons/progress/IconProgressMiddleHorizontal/IconProgressMiddleHorizontal";
import {learnWordFromVocabulary, removeWord} from "../../store/actions/dictionary";
import {useDispatch} from "react-redux";
import IconPlus from "../../icons/IconPlus/IconPlus";

function WordsTable(props) {
    const dispatch = useDispatch();
    return (
        <div className="words-table">
            {
                props.words.map(word => (
                    <div className="words-row" key={word.id}>
                        <div className="word-audio">
                            <IconSpeaker />
                        </div>
                        <div className="word-text">
                            <div className="word-original">
                                {word.original}
                            </div>
                            <div className="word-translation">
                                {word.translation}
                            </div>
                        </div>
                        {
                            word.vocabulary && (
                                <Link className="word-vocabulary"
                                      to={`/dictionary/my/${word.vocabulary.id}`}>
                                    {word.vocabulary.name}
                                </Link>
                            )
                        }
                        {!props.vocabularyId && (
                            <React.Fragment>
                                <div className="word-progress">
                                    <div className="word-progress-icon">
                                        { word.isNew && <IconProgressLowHorizontal /> }
                                        { word.isLearning && <IconProgressMiddleHorizontal /> }
                                        { word.isLearned && <IconProgressHighHorizontal /> }
                                    </div>
                                </div>
                                <div className="word-actions-delete" onClick={() => dispatch(removeWord(word.id))}>
                                    <IconTrash />
                                </div>
                            </React.Fragment>
                            )}
                        {(props.vocabularyId && !word.userWords) && (
                            <div className="word-actions-add" onClick={() => dispatch(learnWordFromVocabulary(word.id, props.vocabularyId))}>
                                <IconPlus />
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}
export default WordsTable;
