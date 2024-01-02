import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { decrypt } from "dotenv";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const Signup=async (req,res,next)=>{
   const { username, email, password }=req.body
   const hashedPassword=bcryptjs.hashSync(password,10)
   const newUser = new User({ username, email, password:hashedPassword });
   try{
       await newUser.save()
       res.status(201).json("user created successfully.")
   }
   catch(error){
    next(error)
   }
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

export const google=async(req,res,next)=>{
  const {email,photo,name}=req.body
  try{
    const user=User.findOne({email})
    if(user){
      console.log(user,"user")
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
      
      res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json(user)
    } else{
      const generatePassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword=bcryptjs(generatePassword,10)
      const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo})
      await newUser.save()
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json(rest)
        
    }

  }
  catch(error){
    next(error)
  }
}


// MONGO="mongodb+srv://mishravikasomu:vika$omu1998@real-estate.ehqe1as.mongodb.net/real-state?retryWrites=true&w=majority"
// JWT_SECRET="nlskdnlsdnklsdljdskljsdlkjsd"