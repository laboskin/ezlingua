const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const schema = new Schema({
    original: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
});

module.exports = model('Word', schema);