const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    profileimg: {type: String, default: "/images/defaultprofile.png"}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);