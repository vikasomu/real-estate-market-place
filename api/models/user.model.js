import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:"string",
        required:true,
        unique:true
    },
    email:{
        type:"string",
        required:true,
        unique:true
    },
    password:{
        type:"string",
        required:true,
        unique:true
    },
    
},{timestamps:true})

const User=mongoose.Model("user",userSchema)

export default User