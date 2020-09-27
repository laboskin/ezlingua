const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');
const Word = require('./Word');
const Vocabulary = require('./Vocabulary');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    words: [{
        model:{
            type: Types.ObjectId,
            ref: Word.modelName
        },
        vocabulary: {
            type: Types.ObjectId,
            ref: Vocabulary.modelName,
            required: false
        },
        trainingCards: {
            type: Boolean,
            required: true,
            default: false
        },
        trainingConstructor: {
            type: Boolean,
            required: true,
            default: false
        },
        trainingListening: {
            type: Boolean,
            required: true,
            default: false
        },
        trainingTranslationWord: {
            type: Boolean,
            required: true,
            default: false
        },
        trainingWordTranslation: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
});

module.exports = model('User', schema);