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
schema.virtual('imageLink').get(function() {
    return `/img/flags/${this.image}`;
})

module.exports = model('Language', schema);