const mongoose = require('mongoose');
// Id, userName, accountNumber, emailAddress, identityNumber

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true
    } 
});

module.exports = mongoose.model('User', userSchema);