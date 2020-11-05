const {Schema, model, Types} = require('mongoose');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Course = require('./Course');

const schema = new Schema({
    name: {
        type: String,
        required: true,
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
    course: {
        type: Types.ObjectId,
        required: true,
        ref: Course.modelName
    },
    sentences: [{
        position: {
            type: Number,
            required: true
        },
        isEmpty: {
            type: Boolean,
            default: false
        },
        parts: {
            type: [{
                position: {
                    required: true,
                    type: Number
                },
                text: {
                    required: true,
                    type: String
                },
                hasTranslation: {
                    required: true,
                    type: Boolean
                },
                spaceAfter: {
                    required: true,
                    type: Boolean
                }
            }],
            default: undefined,
            required: function() {
                return !this.isEmpty;
            }
        }
    }]
});

schema.virtual('imageLink').get(function() {
    if (this.image && fs.existsSync(path.resolve('./public/img/stories/', this.image)))
        return `/img/stories/${this.image}`;
    return '/img/nophoto.svg';
});

schema.methods.deleteImageFile = function() {
    if (this.image && fs.existsSync(path.resolve('./public/img/stories/', this.image)))
        fs.unlinkSync(path.resolve('./public/img/stories/', this.image));
}

schema.pre('remove', async function() {
    this.deleteImageFile();

    const users = await require('./User').find({}).select('stories');
    for (const user of users) {
        if (user.stories.find(story => story.toString() === this.id.toString())) {
            user.stories = user.stories.filter(story => story.toString() !== this.id.toString());
            await user.save();
        }
    }
});

schema.pre('save', async function() {
    if(this._newImageBase64) {
        fs.writeFileSync(path.resolve('./public/img/stories/', this.image), this._newImageBase64, {encoding: 'base64'});

        if (this._previousImage && fs.existsSync(path.resolve('./public/img/stories/', this._previousImage)))
            fs.unlinkSync(path.resolve('./public/img/stories/', this._previousImage));
    }
});

module.exports = model('Story', schema);