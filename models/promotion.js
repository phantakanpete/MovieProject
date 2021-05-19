const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: String,
    image: String,
    desc: String,
    movie: [{type: String}],
    utldate: String,
    branch: String
});

module.exports = mongoose.model('Promotion', promotionSchema);