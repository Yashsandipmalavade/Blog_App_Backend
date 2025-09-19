const express = require("express")
const router=express.Router()
const {getblog, getbyblog, createblog, updateblog, deleteblog}=require("../controller/blogcontroller.js")
const authenti_middleware=require("../middleware/authenti_middleware.js")
const multer = require('multer');
const upload = require("../middleware/upload_middleware.js"); // or configure storage options
// const upload = require("../middlewares/uploadMiddleware");


router.get("/",authenti_middleware,getblog)//we can use blogcontroller.getblog without importing it
//like router.get("/",blogcontroller.getblog) and no need to import it
router.get("/:id",getbyblog)
router.post("/",authenti_middleware,upload.single('image'),createblog)
router.put("/:id",authenti_middleware,updateblog)
router.delete("/:id",deleteblog)

module.exports=router;