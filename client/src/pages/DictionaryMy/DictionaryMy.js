 import React, {useEffect} from 'react';
 import {useDispatch, useSelector} from "react-redux";
 import {useParams} from "react-router-dom";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import WordsTable from "../../components/WordsTable/WordsTable";
 import {clearUserVocabulary, clearUserWords, loadUserVocabulary, loadUserWords} from "../../store/actions/dictionary";
 import WordsFilters from "../../components/WordsFilters/WordsFilters";
 import VocabularyTitle from "../../components/VocabularyTitle/VocabularyTitle";


function DictionaryMy() {
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const { id: vocabularyId } = useParams();

    const userWords = useSelector(state => state.dictionary.userWords);
    const userVocabulary = useSelector(state => state.dictionary.userVocabulary);

    useEffect(() => {
        if (vocabularyId)
            dispatch(loadUserVocabulary(vocabularyId));
        else
            dispatch(loadUserWords())
    }, [dispatch, currentCourse, updated, vocabularyId]);
    useEffect(() => {
        return () => {
            if (vocabularyId)
                dispatch(clearUserVocabulary());
            else
                dispatch(clearUserWords())
        }
    }, [dispatch, currentCourse, vocabularyId]);

    if (vocabularyId && !userVocabulary) return null;
    if (!vocabularyId && !userWords) return null;

    let words = vocabularyId?userVocabulary.words:userWords;
    const title = `My vocabulary${userVocabulary?`: ${userVocabulary.name}`:''}`.toUpperCase() + ` - ${words.length} words`;

    return (
        <MainContainer maxWidth="900px">
            <VocabularyTitle title={title}
                             image={userVocabulary && userVocabulary.image}
                             vocabularyId={vocabularyId}
                             fullVocabulary={userVocabulary && userVocabulary.fullVocabulary } />
            <WordsFilters vocabularyId={userVocabulary && userVocabulary.id}/>
            <WordsTable words={words} />
        </MainContainer>
    )
}

export default DictionaryMy;
