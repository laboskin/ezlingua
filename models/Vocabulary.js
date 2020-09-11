const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    courseId: {
        type: Types.ObjectId,
        required: true,
    },
    groupId: {
        type: Types.ObjectId
    },
    image: {
        type: String
    }
});

module.exports = model('Vocabulary', schema);