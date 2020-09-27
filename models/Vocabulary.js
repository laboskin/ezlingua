const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');
const Word = require('./Word');

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
    groupId: {
        type: Types.ObjectId
    },
    image: {
        type: String
    },
    words: [{
        type: Types.ObjectId,
        ref: Word.modelName
    }],
});

module.exports = model('Vocabulary', schema);