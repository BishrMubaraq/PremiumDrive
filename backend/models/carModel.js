const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    rent: {
        type: String,
        required: [true, 'Please add rent']
    },
    place: {
        type: String,
        required: [true, 'Please add place']
    },
    brand: {
        type: String,
        required: [true, 'Please add brand']
    },
    transmission: {
        type: String,
        required: [true, 'Please add transmission type']
    },
    fuel: {
        type: String,
        required: [true, 'Please add fuel type']
    },
    body: {
        type: String,
        required: [true, 'Please add body type']
    },
    registrationNo: {
        type: String,
        required: [true, 'Please add registration no.']
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    bookedSlots: [{ from: { type: String }, to: { type: String } }]
}, { timestamps: true })

module.exports = mongoose.model('Cars', carSchema)