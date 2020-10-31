const {Schema, model} = require('mongoose');

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
    return `/img/${this.image?'flags/this.image':'nophoto.svg'}`;
})

module.exports = model('Language', schema);