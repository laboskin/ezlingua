const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');
const Word = require('./Word');
const Vocabulary = require('./Vocabulary');
const Story = require('./Story');

const wordsSchema = new Schema({
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
})

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
    words: [wordsSchema],
    stories: [{
        type: Types.ObjectId,
        ref: Story.modelName
    }],

});

const requiredTrainingsNumber = 4;

wordsSchema.virtual('trainingsCompleted').get(function() {
    let count = 0;
    if (this.trainingCards) count++;
    if (this.trainingConstructor) count++;
    if (this.trainingListening) count++;
    if (this.trainingTranslationWord) count++;
    if (this.trainingWordTranslation) count++;
    return count;
});
wordsSchema.virtual('isNew').get(function() {
    return this.trainingsCompleted === 0;
});
wordsSchema.virtual('isLearning').get(function() {
    return this.trainingsCompleted > 0 && this.trainingsCompleted < requiredTrainingsNumber;
})
wordsSchema.virtual('isLearned').get(function() {
    return this.trainingsCompleted >= requiredTrainingsNumber;
})

module.exports = model('User', schema);