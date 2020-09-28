const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');
const Word = require('./Word');
const VocabularyGroup = require('./VocabularyGroup');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
    vocabularyGroup: {
        type: Types.ObjectId,
        required: true,
        ref: VocabularyGroup.modelName
    },
    image: {
        type: String
    },
    words: [{
        type: Types.ObjectId,
        ref: Word.modelName
    }],
});

schema.virtual('imageLink').get(function() {
    return `/img/vocabularies/${this.image || 'nophoto.svg'}`;
})

module.exports = model('Vocabulary', schema);