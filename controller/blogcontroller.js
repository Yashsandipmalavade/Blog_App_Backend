const BLOG=require("../model/blogmodel.js")

const getblog = async(req,res)=>{
    try{
        const allBLOG=await BLOG.find().populate("author","username role age").populate("comments","text")
        res.status(200).json(allBLOG)
    }catch(err){
        res.status(500).json({message:"no blog is fetched",error:err})
    }
}


// const getbyidblog=async(req,res)=>{
//     try{
//         const blog=await BLOG.findById(req.params.id)
//         if (!blog){
//             return res.status(500).json({message:"no blog is present",error:err})
//         }
//         res.status(200).json({message:"your blog  is",data:getBLOG})
//     }catch(err){
//         res.status(500).json({message:"no blog is present",error:err})
//     }

// }we can create by using these also

const getbyblog = async(req,res)=>{
    const {id}=req.params
    try{
        const getBLOG=await BLOG.findById(id)
        if (!getBLOG){
            return res.status(500).json({message:"no blog is present",error:err})
        }
        res.status(200).json({message:"your blog  is",data:getBLOG})
    }catch(err){
        res.status(500).json({message:"no blog is present",error:err})
    }
}


const createblog = async(req,res)=>{
    try{
        
        const {title,content}=req.body
        let imageUrl = null;
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }

    const newBLOG = new BLOG({
      title,
      content,
      author: req.user.id,
      image: imageUrl
    });

    console.log("NEW BLOG:", newBLOG);

    await newBLOG.save();
        res.status(201).json(newBLOG);
     
    }
    catch(err){
       res.status(400).json({message:"Blog Not Created",error:err});
    }
}

// const updateblog = async(req,res)=>{
//     const {id}=req.params
//     const {title,content}=req.body
//     try{
//         const updateBLOG=await BLOG.findByIdAndUpdate(id,{title,content})
//         if (!updateBLOG){
//             return res.status(500).json({message:"not fetch data",error:err})
//         }
//         res.status(200).json({message:"data updated succesfully",data:updateBLOG})
//     }catch(err){
//         res.status(500).json({message:"not fetch data",error:err})
//     }
// }

const updateblog=async(req,res)=>{
    try{
        const blog=await BLOG.findById(req.params.id)
        console.log(blog);
        if (!blog){
            return res.status(404).json({message:"no blog is present",error:err})
        }
        //check that auther and user.id  is same then only able to update
        console.log(blog.author.toString(),"id compare",req.user.id)
        if (blog.author.toString()!==req.user.id){
            return res.status(403).json({error:"Unauthorized or Only author can update these blog"})
        }
        //update the data
        blog.title=req.body.title || blog.title
        blog.content=req.body.content || blog.content
        await blog.save()

        res.status(200).json({message:"your blog is updated",data:blog})
    }catch(err){
        res.status(500).json({message:"error",error:err})
    }

}


// https://github.com/Abhisek753/Skillian-Batch-2


// const deleteblog = async(req,res)=>{
//     try{
//         const blog=await BLOG.findById(req.params.id)
//         if (!blog){
//             return res.status(500).json({message:"no blog is present",error:err})
//         }
//         await BLOG.deleteOne()
//         res.status(200).json({message:"your blog  is",data:getBLOG})
//     }catch(err){
//         res.status(500).json({message:"no blog is present",error:err})
//     }
// }      

const deleteblog = async(req,res)=>{
    const {id}=req.params
    try{
        const deleteBLOG=await BLOG.findByIdAndDelete(id)
        if (!deleteBLOG){
            return res.status(500).json({message:"not delete data",error:err})
        }
        res.status(200).json({message:"data deleted succesfully",data:deleteBLOG})
    }catch(err){
        res.status(500).json({message:"not delete data",error:err})
    }
}
module.exports={getblog, getbyblog, createblog, updateblog, deleteblog}
