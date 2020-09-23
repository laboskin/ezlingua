const {Schema, model, Types} = require('mongoose');
const Language = require('./Language');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    goalLanguage: {
        type: Types.ObjectId,
        required: true,
        ref: Language.modelName
    },
    sourceLanguage: {
        type: Types.ObjectId,
        required: true,
        ref: Language.modelName
    },
});

module.exports = model('Course', schema);