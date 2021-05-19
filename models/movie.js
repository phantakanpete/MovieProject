const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    image: String,
    reldate: String,
    genre: String,
    rate: String,
    duration: String,
    desc: String,
    trailer: String
});

module.exports = mongoose.model('Movie', movieSchema);