const jwt=require("jsonwebtoken")
require("dotenv").config()
const JWT_secret=process.env.JWT_SECRET
const authmiddleware=(req,res,next)=>{

    const authheader=req.headers["authorization"]
    const token =authheader && authheader.split(" ")[1]
    if (!token){
        return res.status(401).json({message:"token not provided"})

    }
    try{
        const decoded=jwt.verify(token,JWT_secret)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({message:"token expired or invalid"})
    }
}

module.exports=authmiddleware