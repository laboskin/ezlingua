const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    courseId: {
        type: Types.ObjectId,
        required: true
    }
});

module.exports = model('VocabularyGroup', schema);