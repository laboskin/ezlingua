import {
    STORIES_ADD_WORD, STORIES_CLEAR_STORY, STORIES_REMOVE_WORD,
    STORIES_SET_SELECTED_WORD,
    STORIES_SET_STORIES, STORIES_LOAD_STORY, STORIES_SET_TRANSLATIONS, STORIES_COMPLETE_STORY,
} from '../actions/actionTypes';

const initialState = {
    stories: null,
    story: null,
    selectedWord: {
        sentencePosition: null,
        partPosition: null
    },
    translations: null,
    addedWords: [],
    completed: false
}

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case STORIES_SET_STORIES:
            return {
                ...state,
                stories: action.payload
            }
        case STORIES_LOAD_STORY:
            return {
                ...state,
                story: action.payload
            }
        case STORIES_CLEAR_STORY:
            return {
                ...state,
                story: initialState.story,
                selectedWord: initialState.selectedWord,
                translations: initialState.translations,
                addedWords: initialState.addedWords,
                completed: initialState.completed
            }
        case STORIES_SET_SELECTED_WORD:
            return {
                ...state,
                selectedWord: {
                    sentencePosition: action.sentencePosition,
                    partPosition: action.partPosition
                }
            }
        case STORIES_SET_TRANSLATIONS:
            return {
                ...state,
                translations: action.translations
            }
        case STORIES_ADD_WORD:
            return {
                ...state,
                addedWords: [
                    ...state.addedWords,
                    action.word
                    ]
            }
        case STORIES_REMOVE_WORD:
            return {
                ...state,
                addedWords: state.addedWords
                    .filter(word => !(word.original === action.word.original
                        && word.translation === action.word.translation))
            }
        case STORIES_COMPLETE_STORY:
            return {
                ...state,
                completed: true
            }
        default:
            return state
    }
}