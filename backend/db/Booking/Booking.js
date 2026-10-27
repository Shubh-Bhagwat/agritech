const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    serviceType: String,
    bookingDate: Date,
    returnDate: Date,
    status: {
        type: String,
        default: "pending"
    },
    totalAmount: Number,
    notes: String,
})

module.exports = mongoose.model('Booking', bookingSchema);
