const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    members: {
        type: Array
    }
}, { timestamps: true })

module.exports=mongoose.model('chat',chatSchema)