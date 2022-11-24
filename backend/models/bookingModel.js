const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: [true, 'Car id is required'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: [true, 'User id is required'] },
    bookedSlots: { from: { type: String }, to: { type: String } },
    dropoffCity: { type: String, required: [true, 'DropOff city is required'] },
    totalAmount: { type: String, required: [true, 'Total Amount is required'] },
    totalHours: { type: String, required: [true, 'Total Hours is required'] },
    driverRequire: { type: Boolean, required: [true, 'Driver status required'] },
    transactionId: { type: String, required: [true, 'Transaction Id is required'] },
    status: { type: String, default: 'pending' },
    shippingAddress: { name: { type: String }, email: { type: String }, address: { type: String }, city: { type: String }, pincode: { type: String } }
}, { timestamps: true })

module.exports = mongoose.model('Bookings', bookingSchema)