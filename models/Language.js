const {Schema, model} = require('mongoose');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
    if (this.image && fs.existsSync(path.resolve('./public/img/flags/', this.image)))
        return `/img/flags/${this.image}`;
    return '/img/nophoto.svg';
});

schema.methods.deleteImageFile = function() {
    if (this.image && fs.existsSync(path.resolve('./public/img/flags/', this.image)))
        fs.unlinkSync(path.resolve('./public/img/flags/', this.image));
}

schema.pre('remove', async function() {
    this.deleteImageFile();

    const courses = await require('./Course').find();
    for (const course of courses) {
        if (course.goalLanguage.toString() === this.id.toString() || course.sourceLanguage.toString() === this.id.toString())
            await course.remove();
    }
});

schema.pre('save', async function() {
    if(this._newImageBase64) {
        fs.writeFileSync(path.resolve('./public/img/flags/', this.image), this._newImageBase64, {encoding: 'base64'});

        if (this._previousImage && fs.existsSync(path.resolve('./public/img/flags/', this._previousImage)))
            fs.unlinkSync(path.resolve('./public/img/flags/', this._previousImage));
    }
});

module.exports = model('Language', schema);