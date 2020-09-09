const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
    issuedAt: {
        type: Date,
        required: true
    }
});

module.exports = model('RefreshToken', schema);