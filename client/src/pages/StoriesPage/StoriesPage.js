import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearStory, loadStory, selectWord, unselectWord} from "../../store/actions/stories";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import './style.scss';
import {useParams} from "react-router-dom";
import IconTrash from "../../icons/IconTrash/IconTrash";

function StoriesPage() {
    const dispatch = useDispatch();
    const { id: storyId } = useParams();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const story = useSelector(state => state.stories.story);
    const selectedWord = useSelector(state => state.stories.selectedWord);
    const translations = useSelector(state => state.stories.translations);
    const translationsVisible = !!translations;
    const addedWords = [];

    useEffect(() => {
        dispatch(loadStory(storyId));
        return () => dispatch(clearStory());
    }, [dispatch, currentCourse, storyId]);

    const bodyClearTranslationsClickListener = useCallback((event) => {
        if(!event.target.classList.contains('StoriesPage-TextSpan_selected'))
            dispatch(unselectWord());
    }, [dispatch]);
    useEffect(() => {
        if (translationsVisible) {
            document.body.addEventListener('click', bodyClearTranslationsClickListener);
        }
        return () => document.body.removeEventListener('click', bodyClearTranslationsClickListener);
    }, [dispatch, bodyClearTranslationsClickListener, translationsVisible]);

    if (!story) return null;
    return (
        <MainContainer maxWidth="1100px">

            <div className="StoriesPage">
                <div className="StoriesPage-Main">
                    <div className="StoriesPage-Title">
                        {story.name}
                    </div>
                    <div className="StoriesPage-Text">
                        {story.sentences.map(sentence => {
                            if (sentence.isEmpty)
                                return <br key={sentence.position} />;
                            return sentence.parts.map(part => {
                                const cssClass = ['StoriesPage-TextSpan'];
                                if (part.hasTranslation)
                                    cssClass.push('StoriesPage-TextSpan_hasTranslation');

                                if (addedWords.find(selectedWord => selectedWord.original === part.text))
                                    cssClass.push('StoriesPage-TextSpan_added');
                                else if (sentence.position === selectedWord.sentencePosition && part.position === selectedWord.partPosition)
                                    cssClass.push('StoriesPage-TextSpan_selected');
                                return (
                                    <React.Fragment key={sentence.position + '' + part.position}>
                                    <span className={cssClass.join(' ')} onClick={() => part.hasTranslation && dispatch(selectWord(sentence.position, part.position))}>
                                        {part.text}
                                    </span>
                                        {part.spaceAfter?' ':''}
                                    </React.Fragment>)
                            });
                        })}
                    </div>
                    <div className="StoriesPage-Complete">
                        <div className="StoriesPage-CompleteButton">
                            Complete
                        </div>
                    </div>

                    <div className="StoriesPage-Popover">
                        <div className="StoriesPage-PopoverDiamond"/>
                        <div className="StoriesPage-PopoverTranslations">
                            <div className="StoriesPage-PopoverTranslation">
                                <div className="StoriesPage-PopoverTranslationConfidence">
                                    <div className="StoriesPage-PopoverTranslationConfidenceFilled" />
                                </div>
                                <div className="StoriesPage-PopoverTranslationText">
                                </div>
                                <div className="StoriesPage-PopoverTranslationDelete">
                                    <IconTrash />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="StoriesPage-Words">
                    <div className="StoriesPage-WordsTitle">
                        Words
                    </div>
                    <div className="StoriesPage-WordsItem">
                        <strong>original</strong>
                        <span>—</span>
                        <span>translation</span>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default StoriesPage;
