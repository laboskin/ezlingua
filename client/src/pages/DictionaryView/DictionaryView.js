import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {clearVocabulary, loadVocabulary} from "../../store/actions/dictionary";
import MainContainer from "../../hoc/MainContainer/MainContainer";
import WordsTable from "../../components/WordsTable/WordsTable";
import VocabularyTitle from "../../components/VocabularyTitle/VocabularyTitle";

function DictionaryView() {
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const { id: vocabularyId } = useParams();

    const vocabulary = useSelector(state => state.dictionary.vocabulary);

    useEffect(() => {
        dispatch(loadVocabulary(vocabularyId));
    }, [dispatch, currentCourse, updated, vocabularyId]);
    useEffect(() => {
        return () => {
            dispatch(clearVocabulary());
        }
    }, [dispatch, currentCourse, vocabularyId]);

    if (!vocabulary) return null;

    const title = `Vocabulary: ${vocabulary.name}`.toUpperCase() + ` - ${vocabulary.words.length} words`;

    return (
        <MainContainer maxWidth="900px">
            <VocabularyTitle title={title}
                             image={vocabulary && vocabulary.image}
                             vocabularyId={vocabularyId}
                             isUserVocabulary={vocabulary.isUserVocabulary}
                             isNotUserVocabulary={!vocabulary.isUserVocabulary}
            />
            <WordsTable words={vocabulary.words}
                        vocabularyId={vocabularyId}/>
        </MainContainer>
    )
}

export default DictionaryView;
