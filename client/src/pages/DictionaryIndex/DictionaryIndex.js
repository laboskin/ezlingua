import React, {useEffect} from 'react';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {clearVocabularies, loadVocabularies} from "../../store/actions/dictionary";
import DictionaryProgress from "../../components/DictionaryProgress/DictionaryProgress";
import VocabularyGroup from "../../components/VocabularyGroup/VocabularyGroup";

function DictionaryIndex() {
    const dispatch = useDispatch();
    const updated = useSelector(state => state.dictionary.updated);
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const vocabularyGroups = useSelector(state => state.dictionary.vocabularyGroups);
    const userVocabularies = useSelector(state => state.dictionary.userVocabularies);

    useEffect(()=> {
        dispatch(loadVocabularies());
    }, [dispatch, currentCourse, updated]);
    useEffect(()=> {
        return () => {
            dispatch(clearVocabularies());
        }
    }, [dispatch, currentCourse]);

    if (!userVocabularies || !vocabularyGroups) return null;

    return (
        <MainContainer maxWidth="1000px">
            <DictionaryProgress />
            <VocabularyGroup title="My vocabularies"
                             vocabularies={userVocabularies}
                             isUserVocabulary
            />
            {vocabularyGroups.map(vg => (
                <VocabularyGroup
                    title={vg.name}
                    vocabularies={vg.vocabularies}
                />
                ))}

        </MainContainer>
    )
}

export default DictionaryIndex;