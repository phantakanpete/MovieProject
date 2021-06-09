const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    name: String,
    img: String,
    type: String,
    price: String
});

module.exports = mongoose.model('Seat', seatSchema);