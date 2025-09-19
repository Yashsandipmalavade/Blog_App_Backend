const express=require("express")
const router=express.Router()
const { getlikeByBlog } = require("../controller/likeController.js")
const { getlike } = require("../controller/likeController.js")
const { createLike } = require("../controller/likeController.js")
const authenti_middleware=require("../middleware/authenti_middleware.js")


router.get("/",getlike)
router.get("/:id",getlikeByBlog)
router.post("/",authenti_middleware,createLike)

module.exports=router