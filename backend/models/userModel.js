const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add Phone Number']
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }

}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)