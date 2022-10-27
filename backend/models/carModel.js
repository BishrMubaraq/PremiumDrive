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
        type: String,
        required: [true, 'Please add image']
    },
    isDeleted: {
        type: Boolean,
        default:false,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Cars', carSchema)