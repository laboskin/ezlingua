const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    goalLanguageId: {
        type: Types.ObjectId,
        required: true
    },
    originalLanguageId: {
        type: Types.ObjectId,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = model('Course', schema);