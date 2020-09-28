const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
});

module.exports = model('VocabularyGroup', schema);