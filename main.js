const express =require("express")
const app =express()
app.use(express.json())

require("dotenv").config()
const port=process.env.PORT

const connectDB=require("./config/databasec.js")

app.get("/",(req,res)=>{//here first i use app.use"/" so it will override base route to all others so use get 
    res.send("Welcome to my blog app")
})

const authroute=require("./Routes/authroute.js")
app.use("/auth",authroute)

// const contentroute=require("./routes/contentroute.js")
// app.use("/products",contentroute)

const blogroute=require("./Routes/blogroute.js")
const commentRoute = require("./Routes/commentRoute.js")
const likeRoute = require("./Routes/likeRoute.js")

app.use("/blogs",blogroute)

app.use("/comment",commentRoute)

app.use("/like",likeRoute)

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is on http://localhost:${port}`);
        
    })
})
