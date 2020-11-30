const {Schema, model, Types} = require('mongoose');
const Language = require('./Language');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
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

schema.pre('remove', async function() {
    const words = await require('./Word').find({course: this.id});
    for (const word of words)
        await word.remove();

    const vocabularies = await require('./Vocabulary').find({course: this.id});
    for (const vocabulary of vocabularies)
        await vocabulary.remove();

    const users = await require('./User').find({course: this.id}).populate('words.model', 'course');
    for (const user of users) {
        user.course = user.words[0].model.course;
        await user.save();
    }
});


module.exports = model('Course', schema);