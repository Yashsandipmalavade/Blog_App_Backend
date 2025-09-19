
const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT_SECRET=process.env.JWT_SECRET||"yoursecret" //in case if we dont haveany secret key thennuse ||"yoursecret"
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../model/usermodel.js")


router.post('/Register',async(req,res)=>{
    const {username,role,password}=req.body
    try{
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
        }
        const hashed=await bcrypt.hash(password,10)
        console.log(password,hashed,username,"password =====>")
        const user=await User.create({username,role,password:hashed});
        res.status(200).json({message:"User registered",user:user});
    }catch(err){
        console.log(err.stack)
        res.status(500).json({message:"error in registration",error:err})
    }

})
router.post('/Login',async(req,res)=>{
    const {username,password}=req.body

    try{
        const user=await User.findOne({username})
        console.log(user)
        if (!user){
            return res.status(404).json({message:"user not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(401).json({message:"Invalid Credential"})
        }
        const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1h"})
        return res.json({message:"Login Succesful",token})
        //console.log(isMatch,"match result",user,password)

    }catch(err){
        return res.status(404).json({error:err})
    }

})

module.exports=router