const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: String,
    location: {
        state: String,
        district: String,
        village: String,
        latitude: Number,
        longitude: Number,
    },
    sizeInAcres: Number,
    soilType: String,
    irrigationType: String,
    crops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
    }]
})

module.exports = mongoose.model('Farm', farmSchema);
