const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    seatselect: [{type: String}],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        firstname: String,
        lastname: String,
        email: String
    },
    payment: {
        ptype: String,
        nameoncard: String,
        creditno: String,
        exp: String,
        cvv: String
    },
    totalprice: String,
    showtime: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Showtime'
        }
    ],
    time: Date
});

module.exports = mongoose.model('Bill', billSchema);