import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const forAuthUser=async (req,res,next)=>{
   
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
           
        let token=req.headers.authorization.split(" ")[1]
        let decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        let user=await User.findById(decoded.id).select("-password")
        req.user=user
        next()
    } 
    else{ 
        res.status(401).json({msg:"You are  authorized but invalid token"})
    }
    } catch (error) {
         res.status(401).json({msg:"You are  unauthorized "})
    }
}
const forAdmin=async (req,res,next)=>{
   
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
           
        let token=req.headers.authorization.split(" ")[1]
        let decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        let user=await User.findById(decoded.id).select("-password")
        if(user.isAdmin){
            req.user=user
        next()
        }else{
      res.status(401).json({msg:"Admin Access Only"})
    }
    } 
    else{ 
        res.status(401).json({msg:"You are  authorized but invalid token"})
    }
    } catch (error) {
         res.status(401).json({msg:"You are  unauthorized "})
    }
}


const protect={forAuthUser,forAdmin}
export default protect
