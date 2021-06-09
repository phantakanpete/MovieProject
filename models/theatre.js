const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: String,
    showtime: [{type: String}],
    seats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seat'
        }
    ],
    movie: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    cinema: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cinema'
        }
    ]
});

module.exports = mongoose.model('Theatre', theatreSchema);