const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
});

module.exports = mongoose.model('Cinema', cinemaSchema);