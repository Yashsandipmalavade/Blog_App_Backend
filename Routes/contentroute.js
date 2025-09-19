const express=require("express")
const { getcomment,getcommentByBlog, createComment, updatecomment} = require("../controller/commentController")
const authmiddleware = require("../middleware/authenti_middleware")

const router=express.Router()

router.get("/",authmiddleware,getcomment)
router.get("/blog/:blogid",getcommentByBlog)
router.post("/",authmiddleware,createComment)
router.put("/:id",authmiddleware,updatecomment)

module.exports=router