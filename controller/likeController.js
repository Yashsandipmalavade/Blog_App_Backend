const Like=require("../model/like.js")
const BLOG = require("../model/blogmodel.js")

exports.createLike=async(req,res)=>{
    try{
        const blog=req.body
        const blogdata=await BLOG.findById(blog)
        if(!blogdata){
            return res.status(404).json({Message:"Blog not found"})
        }
        const like=new Like({
            user:req.user.id,
            blog:blog
        })
        await like.save()
        BLOG.like.push(like._id)
        await blog.save()

        await like.populate("user","username role")

    }catch(err){
        res.status(404).json({message:"like creation failed", error:err})
    }
}

exports.getlikeByBlog=async(req,res)=>{
    try{
        const {blogid}=req.params
        console.log(blogid,"111")

        const likes=await Like.find({blog:blogid}).populate("user","username").populate("blog","title")
        res.status(200).json({likes:likes})
    }catch(err){
        res.status(400).json({message:"like request failed",error:err})
    }
}

exports.getlike=async(req,res)=>{
    try{
        const likes=await Like.find()
        res.status(200).json({likes:likes})
    }catch(err){
        res.status(400).json({message:"likes request failed",error:err})
    }
}
