const mongoose = require('mongoose');
// Id, userName, accountNumber, emailAddress, identityNumber

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        unique: true
    },
    accountNumber: {
        type: String,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true
    },
    identityNumber: {
        type: String,
        unique: true
    } 
});

module.exports = mongoose.model('User', userSchema);