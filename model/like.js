const mongoose = require("mongoose")

const likeschema=new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,ref:"BLOG"
        },  
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    likeAt:{
        type:Date,
        default:Date.now()
    }
})

const Like=mongoose.model("Like",likeschema)
module.exports=Like