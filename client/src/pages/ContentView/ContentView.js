import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearContent, loadContent} from "../../store/actions/content";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import './style.scss';
import {useParams} from "react-router-dom";
import IconTrash from "../../icons/IconTrash/IconTrash";

function ContentView() {
    const dispatch = useDispatch();
    const { id: contentId } = useParams();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const content = useSelector(state => state.content.one);

    useEffect(() => {
        dispatch(loadContent(contentId));

        return () => {
            dispatch(clearContent());
        }
    }, [dispatch, currentCourse, contentId]);
    const selectedWords = [];

    if (!content) return null;
    return (
        <MainContainer maxWidth="900px">

            <div className="ContentView">
                <div className="ContentView-Main">
                    <div className="ContentView-Title">
                        {content.name}
                    </div>
                    <div className="ContentView-Text">
                        {content.sentences.map(sentence => {
                            if (sentence.isEmpty)
                                return <br key={sentence.position} />;
                            return sentence.parts.map(word => {
                                const cssClass = ['ContentView-TextSpan'];
                                if (word.hasTranslation)
                                    cssClass.push('ContentView-TextSpan_hasTranslation');
                                if (selectedWords.find(selectedWord => selectedWord.original === word.text))
                                    cssClass.push('ContentView-TextSpan_added');
                                if (false)
                                    cssClass.push('ContentView-TextSpan_selected');
                                return (
                                    <React.Fragment key={sentence.position + '' + word.position}>
                                    <span className={cssClass.join(' ')}>
                                        {word.text}
                                    </span>
                                        {word.spaceAfter?' ':''}
                                    </React.Fragment>)
                            });
                        })}
                    </div>
                    <div className="ContentView-Complete">
                        <div className="ContentView-CompleteButton">
                            Complete
                        </div>
                    </div>

                    <div className="ContentView-Popover">
                        <div className="ContentView-PopoverDiamond"/>
                        <div className="ContentView-PopoverTranslations">
                            <div className="ContentView-PopoverTranslation">
                                <div className="ContentView-PopoverTranslationConfidence">
                                    <div className="ContentView-PopoverTranslationConfidenceFilled" />
                                </div>
                                <div className="ContentView-PopoverTranslationText">
                                </div>
                                <div className="ContentView-PopoverTranslationDelete">
                                    <IconTrash />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="ContentView-Words">
                    <div className="ContentView-WordsTitle">
                        Words
                    </div>
                    <div className="ContentView-WordsItem">
                        <strong>original</strong>
                        <span>—</span>
                        <span>translation</span>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default ContentView;
