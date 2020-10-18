const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const spanSchema = new Schema({
    sentencePosition: {
        required: true,
        type: Number
    },
    position: {
        required: true,
        type: Number
    },
    text: {
        required: true,
        type: String
    },
    hasTranslation: {
        required: true,
        type: Boolean
    },
    spaceAfter: {
        required: true,
        type: Boolean
    }
});

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
    spans: [spanSchema]
});

module.exports = model('Content', schema);