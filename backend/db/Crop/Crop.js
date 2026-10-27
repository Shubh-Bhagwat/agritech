const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
    },
    name: String,
    type: String,
    stage: {
        type: String,
        default: "sowing"
    },
    sowingDate: Date,
    expectedHarvestDate: Date,
    treatments: [{
        name: String,
        date: Date,
        description: String,
    }]
})

module.exports = mongoose.model('Crop', cropSchema);
