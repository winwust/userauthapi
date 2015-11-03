var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String
});

module.exports = mongoose.model('Account', accountSchema);