import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
export const Signup=async (req,res)=>{
   const { username, email, password }=req.body
   const hashedPassword=bcryptjs.hashSync(password,10)
   const newUser = new User({ username, email, password:hashedPassword });
   try{
       await newUser.save()
       res.status(201).json("user created successfully.")
   }
   catch(error){
    console.log(error.message,"msg")
    res.status(500).json(error.message)
   }
}