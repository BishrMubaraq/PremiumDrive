const mongoose = require('mongoose')


const brandSchema=mongoose.Schema({
    brand:{
        type:String,
        required:[true,'Please add brand'],
        unique:true
    },
},{timestamps:true})

module.exports=mongoose.model('brand',brandSchema)