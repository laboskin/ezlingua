import React, {useCallback, useEffect, useRef} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addWord,
    clearStory,
    completeStory,
    loadStory,
    removeWord,
    selectWord,
    unselectWord
} from "../../store/actions/stories";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import './style.scss';
import {useParams} from "react-router-dom";
import IconTrash from "../../icons/IconTrash/IconTrash";
import {useTranslation} from "react-i18next";

function StoriesPage() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const { id: storyId } = useParams();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const story = useSelector(state => state.stories.story);
    const selectedWord = useSelector(state => state.stories.selectedWord);
    const addedWords = useSelector(state => state.stories.addedWords);
    const translations = useSelector(state => state.stories.translations);
    const isCompleted = useSelector(state => state.stories.completed);
    const isPopoverVisible = !!translations;
    const selectedWordRef = useRef();

    useEffect(() => {
        dispatch(loadStory(storyId));
        return () => dispatch(clearStory());
    }, [dispatch, currentCourse, storyId]);

    const bodyClearTranslationsClickListener = useCallback((event) => {
        if(!event.target.classList.contains('StoriesPage-TextSpan_selected') && !event.target.closest('.StoriesPage-Popover'))
            dispatch(unselectWord());
    }, [dispatch]);
    useEffect(() => {
        if (isPopoverVisible) {
            document.body.addEventListener('click', bodyClearTranslationsClickListener, false);
            return () => document.body.removeEventListener('click', bodyClearTranslationsClickListener);
        }
    }, [dispatch, bodyClearTranslationsClickListener, isPopoverVisible]);

    if (!story) return null;
    if (isCompleted) {
        history.push('/stories');
        return null;
    }

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
                                const isAdded = !!addedWords.find(addedWord => addedWord.original === part.text.toLowerCase());
                                const isSelected = sentence.position === selectedWord.sentencePosition && part.position === selectedWord.partPosition;
                                const ref = isSelected?selectedWordRef:undefined;
                                const popoverCssClass = ['StoriesPage-Popover'];
                                if (isSelected && isPopoverVisible) {
                                    const isLeftBorder = selectedWordRef.current
                                        && (selectedWordRef.current.offsetLeft - selectedWordRef.current.offsetWidth < 100);
                                    const isRightBorder = selectedWordRef.current
                                        && (selectedWordRef.current.parentElement.offsetWidth - selectedWordRef.current.offsetLeft < 100);
                                    if(isLeftBorder)
                                        popoverCssClass.push('StoriesPage-Popover_left');
                                    else if (isRightBorder)
                                        popoverCssClass.push('StoriesPage-Popover_right');
                                }

                                const cssClass = ['StoriesPage-TextSpan'];
                                if (part.hasTranslation)
                                    cssClass.push('StoriesPage-TextSpan_hasTranslation');
                                if (isSelected)
                                    cssClass.push('StoriesPage-TextSpan_selected');
                                else if (isAdded)
                                    cssClass.push('StoriesPage-TextSpan_added');
                                return (
                                    <React.Fragment key={sentence.position + '_' + part.position}>
                                    <span className={cssClass.join(' ')}
                                          onClick={() => {
                                              if (part.hasTranslation)
                                                  dispatch(selectWord(sentence.position, part.position))
                                          }}
                                          ref={ref}>
                                        {part.text}
                                        {isSelected && isPopoverVisible && (
                                            <div className={popoverCssClass.join(' ')}>
                                                <div className="StoriesPage-PopoverDiamond"/>
                                                <div className="StoriesPage-PopoverTranslations">
                                                    {translations.map(translation => {
                                                        const isTranslationAdded = !!addedWords.find(addedWord => addedWord.original === part.text.toLowerCase()
                                                            && addedWord.translation === translation.text)
                                                        return (
                                                            <div key={translation.text}
                                                                 className={`StoriesPage-PopoverTranslation ${isTranslationAdded?'StoriesPage-PopoverTranslation_added':''}`}
                                                                 onClick={(event) => {
                                                                     event.stopPropagation();
                                                                     dispatch(unselectWord());
                                                                     if(!isTranslationAdded) {
                                                                         dispatch(addWord(part.text.toLowerCase(), translation.text));
                                                                     }
                                                                 }}>
                                                                <div className="StoriesPage-PopoverTranslationConfidence">
                                                                    <div className="StoriesPage-PopoverTranslationConfidenceFilled"
                                                                         style={{width: `${translation.confidence * 100}%`}}/>
                                                                </div>
                                                                <div className="StoriesPage-PopoverTranslationText">
                                                                    {translation.text}
                                                                </div >
                                                                <div className="StoriesPage-PopoverTranslationDelete"
                                                                     onClick={() => dispatch(removeWord(part.text.toLowerCase(), translation.text))}>
                                                                    {isTranslationAdded && <IconTrash />}
                                                                </div>
                                                            </div>
                                                        )})}
                                                </div>
                                            </div>
                                        )}
                                    </span>
                                        {part.spaceAfter?' ':''}
                                    </React.Fragment>
                                )
                            });
                        })}
                    </div>
                    <div className="StoriesPage-Complete">
                        <div className="StoriesPage-CompleteButton" onClick={() => dispatch(completeStory())}>
                            {t('storiesPage.complete')}
                        </div>
                    </div>
                </div>

                <div className="StoriesPage-Words">
                    <div className="StoriesPage-WordsTitle">
                        {t('storiesPage.words')}
                    </div>
                    {addedWords.map(word => (
                        <div className="StoriesPage-WordsItem" key={`${word.original}_${word.translation}`}>
                            <strong>{word.original}</strong>
                            <span> — </span>
                            <span>{word.translation}</span>
                        </div>
                    ))}
                </div>
            </div>
        </MainContainer>
    )
}

export default StoriesPage;
