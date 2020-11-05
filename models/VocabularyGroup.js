const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
});

schema.pre('remove', async function() {
    const vocabularies = await require('./Vocabulary').find({vocabularyGroup: this.id});
    for (const vocabulary of vocabularies)
        await vocabulary.remove();
});

module.exports = model('VocabularyGroup', schema);