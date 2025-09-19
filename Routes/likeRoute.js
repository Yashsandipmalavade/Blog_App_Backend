const express=require("express")
const router=express.Router()
const { getlikeByBlog } = require("../controller/likeController.js")
const { getlike } = require("../controller/likeController.js")
const { createLike } = require("../controller/likeController.js")


router.get("/",getlike)
router.get("/:id",getlikeByBlog)
router.post("/",createLike)

module.exports=router