const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    time: String,
    seats: [{
        name:{    
            type: String
        },
        type:{    
            type: String
        },
        img:{    
            type: String
        },
        price:{    
            type: Number
        },
        status:{    
            type: String, default: "Available"
        }
    }],
    theatre: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theatre'
        }
    ]
});

module.exports = mongoose.model('Showtime', showtimeSchema);