const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    movie: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Favourite', favouriteSchema);