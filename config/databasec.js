const mongoose=require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.URL)
        console.log("DATABASE IS CONNECTED")
    }catch(err){
        console.log({message:"DATABASE IS NOT CONNECTED",error:err})
    }
}
module.exports=connectDB