const {Schema, model} = require('mongoose');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId: config.get('googleCloud.projectId'),
    keyFilename: './googleCloudStorageKey.json'
});
const bucket = gcs.bucket(config.get('googleCloud.storageBucket'));


const schema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    code: {
        type: String,
        required: true,
        unique: true
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
});

schema.virtual('imageLink').get(function() {
    if (this.image)
        return `https://storage.googleapis.com/${config.get('googleCloud.projectId')}.appspot.com/flags/${this.image}`;
    return `https://storage.googleapis.com/${config.get('googleCloud.projectId')}.appspot.com/nophoto.svg`;
});

schema.pre('remove', async function() {
    if (this.image)
        await bucket.file(`flags/${this.image}`).exists(async (data) => {
            if (data[0])
                await bucket.file(`flags/${this.image}`).delete();
        });

    const courses = await require('./Course').find();
    for (const course of courses) {
        if (course.goalLanguage.toString() === this.id.toString() || course.sourceLanguage.toString() === this.id.toString())
            await course.remove();
    }
});

schema.pre('save', async function() {
    if(this._newImageBase64) {
        const file = bucket.file(`flags/${this.image}`);
        await file.save(Buffer.from(this._newImageBase64, 'base64'));
        if (this._previousImage)
            await bucket.file(`flags/${this._previousImage}`).exists(async (data) => {
                if (data[0])
                    await bucket.file(`flags/${this._previousImage}`).delete();
            });
    }
});

module.exports = model('Language', schema);