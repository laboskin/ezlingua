import React from 'react';
import './style.scss';
import VocabularyCard from "../VocabularyCard/VocabularyCard";

function VocabularyGroup(props) {

    return (
        <div className="VocabularyGroup">
            <div className="VocabularyGroup-Title">
                {props.title}
            </div>
            <div className="VocabularyGroup-Cards">
                {
                    props.vocabularies.map(vocabulary => (
                        <VocabularyCard key={vocabulary.id}
                                        isUserVocabulary={props.isUserVocabulary}
                                        vocabularyId={vocabulary.id}
                                        vocabularyImage={vocabulary.image}
                                        vocabularyName={vocabulary.name}
                                        vocabularyCount={vocabulary.count}
                        />))
                }
                <VocabularyCard hidden />
                <VocabularyCard hidden />
                <VocabularyCard hidden />
                <VocabularyCard hidden />
                <VocabularyCard hidden />
            </div>
        </div>
    )
}

export default VocabularyGroup;