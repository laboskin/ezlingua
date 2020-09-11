const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    original: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    courseId: {
        type: Types.ObjectId,
        required: true
    }
});

module.exports = model('Word', schema);