const {Schema, model, Types} = require('mongoose');
const Course = require('./Course');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
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
    return `/img/${this.image?'stories/this.image':'nophoto.svg'}`;
})

module.exports = model('Story', schema);