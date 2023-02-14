const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const Location = mongoose.model('locationData', locationSchema, 'locationData');
module.exports = Location;