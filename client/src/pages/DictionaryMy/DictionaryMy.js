 import React, {useEffect} from 'react';
 import {useDispatch, useSelector} from "react-redux";
 import {useParams} from "react-router-dom";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import WordsTable from "../../components/WordsTable/WordsTable";
 import {
     clearFilters,
    clearUserVocabulary,
    clearUserWords,
    loadUserVocabulary,
    loadUserWords
} from "../../store/actions/dictionary";
 import WordsFilters from "../../components/WordsFilters/WordsFilters";
 import VocabularyTitle from "../../components/VocabularyTitle/VocabularyTitle";


function DictionaryMy() {
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const { id: vocabularyId } = useParams();

    const userWords = useSelector(state => state.dictionary.userWords);
    const userVocabulary = useSelector(state => state.dictionary.userVocabulary);

    const filters = useSelector(state => state.dictionary.filters);

    useEffect(() => {
        if (vocabularyId)
            dispatch(loadUserVocabulary(vocabularyId));
        else
            dispatch(loadUserWords())
    }, [dispatch, currentCourse, updated, vocabularyId]);
    useEffect(() => {
        return () => {
            dispatch(clearFilters());
            if (vocabularyId)
                dispatch(clearUserVocabulary());
            else
                dispatch(clearUserWords())
        }
    }, [dispatch, currentCourse, vocabularyId]);

    if (vocabularyId && !userVocabulary) return null;
    if (!vocabularyId && !userWords) return null;

    let words = vocabularyId?userVocabulary.words:userWords;
    if (filters.text)
        words = words.filter(word => (word.original + word.translation).toLowerCase().includes(filters.text.toLowerCase()));
    if (filters.training)
        words = words.filter(word => {
            switch (filters.training) {
                case 'cards':
                    return word.trainingCards;
                case 'constructor':
                    return word.trainingConstructor;
                case 'listening':
                    return word.trainingListening;
                case 'translationWord':
                    return word.trainingTranslationWord;
                case 'wordTranslation':
                    return word.trainingWordTranslation;
            }
        })
    if (filters.progress)
        words = words.filter(word => {
            switch (filters.progress) {
                case 1:
                    return word.isNew;
                case 2:
                    return word.isLearning;
                case 3:
                    return word.isLearned;
            }
        })
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
