const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    // You can add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
