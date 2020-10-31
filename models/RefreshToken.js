const {Schema, model, Types} = require('mongoose');
const User = require('./User');

const schema = new Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref: User.modelName
    },
    issuedAt: {
        type: Date,
        required: true
    }
});

module.exports = model('RefreshToken', schema);