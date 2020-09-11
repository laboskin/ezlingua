const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    }
});

module.exports = model('Language', schema);