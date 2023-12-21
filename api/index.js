import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connection establish to MONGO DB")
})
.catch((err)=>{
    console.log(err)
})
const app=express()
app.use(express.json())  //to allow json to be taken in req or body else writtten undefined on sending json data to api from f.e

app.listen(3000,()=>{
    console.log("serving is running on port 3000")
})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)