const mongoose = require('mongoose');

const hoursSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    }],
});

const Hours = mongoose.model('hourData', hoursSchema, 'hourData');
module.exports = Hours;