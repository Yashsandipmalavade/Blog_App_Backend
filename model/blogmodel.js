const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const comment = require("./comment");

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // ✅ Correct
        ref: "User",                          // ✅ String, not variable
        required: true                        // ✅ Comma issue fixed
    },
    image:{type:String,default:null},
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const BLOG = mongoose.model("BLOG", blogschema);
module.exports = BLOG;
