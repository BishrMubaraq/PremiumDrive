const mongoose = require('mongoose')

const driverSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add name']
    },
    phoneNumber:{
        type:String,
        required:[true,'Please add phone number']
    },
    email:{
        type:String,
        required:[true,'Please add email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add password']
    },
    profilePhoto:{
        public_id: {
            type: String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    drivingLicenceFront:{
        public_id: {
            type: String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    drivingLicenceRear:{
        public_id: {
            type: String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:false
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamps:true})

module.exports=mongoose.model('driver',driverSchema)