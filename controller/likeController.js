const Like=require("../model/like.js")
const BLOG = require("../model/blogmodel.js")
const User=require("../model/usermodel.js")

exports.createLike = async (req, res) => {
    try {
        const { blog_id } = req.body;

        const blogdata = await BLOG.findById(blog_id);
        if (!blogdata) {
            return res.status(404).json({ Message: "Blog not found" });
        }

        const like = new Like({
            user: req.user._id,     // ✅ always use _id
            blog: blogdata._id      // ✅ always use _id
        });

        await like.save();

        blogdata.likes.push(like._id);
        await blogdata.save();

        res.status(201).json({ Message: "Like created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "like creation failed", error: err.message });
    }
};

exports.getlikeByBlog = async (req, res) => {
    try {
        const { likeid } = req.params;

        const likes = await Like.findById(likeid)
            .populate("user", "username")
            .populate("blog", "title");

        res.status(200).json({  like:likes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "like request failed", error: err.message });
    }
};


exports.getlike=async(req,res)=>{
    try{
        const likes=await Like.find().populate("user", "username")
            .populate("blog", "title");
        res.status(200).json({likes:likes})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"likes request failed",error:err})
    }
}
