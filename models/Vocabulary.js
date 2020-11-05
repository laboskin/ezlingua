const {Schema, model, Types} = require('mongoose');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Course = require('./Course');
const Word = require('./Word');
const VocabularyGroup = require('./VocabularyGroup');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
    vocabularyGroup: {
        type: Types.ObjectId,
        required: true,
        ref: VocabularyGroup.modelName
    },
    image: {
        type: String,
        set(value){
            if (typeof value === 'object' && value.src && value.ext) {
                if (!this._previousImage && this.image)
                    this._previousImage = this.image;
                this._newImageBase64 = value.src;
                return uuidv4() + '.' + value.ext;
            }
            return this.image;
        }
    },
    words: [{
        type: Types.ObjectId,
        ref: Word.modelName,
        set(value) {
            if (!this._previousWords)
                this._previousWords = this.words || [];
            return value;
        }
    }],
});

schema.virtual('imageLink').get(function() {
    if (this.image && fs.existsSync(path.resolve('./public/img/vocabularies/', this.image)))
        return `/img/vocabularies/${this.image}`;
    return '/img/nophoto.svg';
});

schema.methods.deleteImageFile = function() {
    if (this.image && fs.existsSync(path.resolve('./public/img/vocabularies/', this.image)))
        fs.unlinkSync(path.resolve('./public/img/vocabularies/', this.image));
}

schema.pre('remove', async function() {
    this.deleteImageFile();

    if(this.words && this.words.length > 0) {
        const users = await require('./User').find({});
        for (const user of users)
            if (user.words.find(word => word.vocabulary && word.vocabulary.toString() === this.id.toString())) {
                user.words = user.words.map(word => {
                    if (word.vocabulary && word.vocabulary.toString() === this.id.toString()) {
                        word.vocabulary = undefined;
                    }
                    return word;
                });
                await user.save();
            }
    }
});

schema.pre('save', async function() {
    if (this._previousWords) {
        const removedWords = this._previousWords.filter(previousWord => !this.words.find(currentWord => currentWord.toString() === previousWord.toString()));
        if (removedWords.length > 0) {
            const users = await require('./User').find({});
            for (const user of users)
                if (user.words.find(word => word.vocabulary
                    && word.vocabulary.toString() === this.id.toString()
                    && removedWords.includes(word.model.toString()))) {
                    user.words = user.words.map(word => {
                        if (word.vocabulary
                            && word.vocabulary.toString() === this.id.toString()
                            && removedWords.includes(word.model.toString())) {
                            word.vocabulary = undefined;
                        }
                        return word;
                    });
                    await user.save();
                }
        }
        this._previousWords = undefined;
    }

    if(this._newImageBase64) {
        fs.writeFileSync(path.resolve('./public/img/vocabularies/', this.image), this._newImageBase64, {encoding: 'base64'});

        if (this._previousImage && fs.existsSync(path.resolve('./public/img/vocabularies/', this._previousImage)))
            fs.unlinkSync(path.resolve('./public/img/vocabularies/', this._previousImage));
    }
});

module.exports = model('Vocabulary', schema);