const mongoose=require('mongoose')

const messageScheme=mongoose.Schema({
    chatId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'chat', required: [true, 'Chat id is required'] 
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId
    },
    text:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('messages',messageScheme)