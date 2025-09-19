const BLOG = require("../model/blogmodel.js")
const comment =require("../model/comment.js")

exports.createComment=async(req,res)=>{
    try{
        const {text,blog_id}=req.body
        const blogdata=await BLOG.findById(blog_id)
        console.log(blogdata)
        if(!blogdata){
            return res.status(404).json({Message:"Blog not found"})
        }
        const Comment=new comment({
            text,
            user:req.user.id,
            blog_id:blogdata.id
        })
        await Comment.save()
        blogdata.comments.push(Comment._id)
        await blogdata.save()

        await Comment.populate("user","username role")
        res.status(201).json({Message:"comment created","comment":Comment})

    }catch(err){
        console.log(err)
        res.status(404).json({message:"comment creation failed", error:err})
    }
}

// exports.getcommentByBlog=async(req,res)=>{
//     try{
//         const {blogid}=req.params
//         console.log(blogid,"111")
//         const Comments = await comment.findById(blogid).populate("user", "username").populate("blog", "title");
//         // const Comments=await comment.findById({blog:blogid}).populate("user","username").populate("blog","title")
//         console.log(Comments)
//         res.status(200).json({Comment:Comments})
//     }catch(err){
//         console.log(err)
//         res.status(400).json({message:"comment request failed",error:err})
//     }
// }

exports.getcommentByBlog=async (req,res)=>{

    try{
        const {blogId}= req.params;
        console.log(blogId,"11111111")

       const Abc=await comment.find({blog:blogId}).populate("user","username").populate("blog","title");
       res.status(200).json({comment:Abc})
    }catch(err){
        console.log(err)
       res.status(400).json({message:"Comment response failed",error:err})

    }
}

exports.getcomment=async(req,res)=>{
    try{
        const comments=await comment.find()
        res.status(200).json({comment:comments})
    }catch(err){
        res.status(400).json({message:"comment request failed",error:err})
    }
}

exports.updatecomment=async(req,res)=>{
    try{
    const {commentId}=req.params;
    const {text}=req.body;
    console.log(text,"123");
    const updated=await comment.findByIdAndUpdate( commentId,{text}).populate("user","username role")
    console.log(updated,"updated comment");
    if(!updated){
      return res.status(404).json({message:"comment not found"})
    }
    res.status(200).json({message:"Comment Updated successfully",Comment:updated})



   }catch(err){
        res.status(400).json({message:"updation failed",error:err})
    }
}