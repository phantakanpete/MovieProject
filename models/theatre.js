const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: String,
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