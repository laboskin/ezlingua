const {Schema, model, Types} = require('mongoose');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId: config.get('googleCloud.projectId'),
    keyFilename: './googleCloudStorageKey.json'
});
const bucket = gcs.bucket(config.get('googleCloud.storageBucket'));
const Course = require('./Course');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
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
    if (this.image)
        return `https://storage.googleapis.com/${config.get('googleCloud.projectId')}.appspot.com/stories/${this.image}`;
    return `https://storage.googleapis.com/${config.get('googleCloud.projectId')}.appspot.com/nophoto.svg`;
});

schema.pre('remove', async function() {
    if (this.image)
        await bucket.file(`stories/${this.image}`).exists(async (data) => {
            if (data[0])
                await bucket.file(`stories/${this.image}`).delete();
        });

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
        const file = bucket.file(`stories/${this.image}`);
        await file.save(Buffer.from(this._newImageBase64, 'base64'));
        if (this._previousImage)
            await bucket.file(`stories/${this._previousImage}`).exists(async (data) => {
                if (data[0])
                    await bucket.file(`stories/${this._previousImage}`).delete();
            });
    }
});

module.exports = model('Story', schema);