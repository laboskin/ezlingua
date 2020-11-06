const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const schema = new Schema({
    original: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    translation: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
});

schema.pre('remove', async function() {
    const users = await require('./User').find({}).select('words');
    for (const user of users) {
        if (user.words.find(word => word.model.toString() === this.id.toString())) {
            user.words = user.words.filter(word => word.model.toString() !== this.id.toString());
            await user.save();
        }
    }
    const vocabularies = await require('./Vocabulary').find({}).select('words');
    for (const vocabulary of vocabularies) {
        if (vocabulary.words.find(word => word.toString() === this.id.toString())) {
            vocabulary.words = vocabulary.words.filter(word => word.toString() !== this.id.toString());
            await vocabulary.save();
        }
    }
});

module.exports = model('Word', schema);