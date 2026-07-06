import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs" 
const register=async (req,res)=>{
    const {name,email,password,address}=req.body
    if(!name||!email||!password){
        return res.status(400).json({
            msg:"Please Fill req Details, and Req details are name email password"
        })
    }
    const userExist=await User.findOne({email})
    if(userExist){
        return res.status(409).json({
            msg:"user already exist"
        })
    }
    const salt= await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt )
    const user=await User.create({name,email,password:hashedpassword,address})
    if(!user){
        res.status(404).json({msg:"user not created"})
    }
    res.status(201).json({
        id:user._id,name,email,address,token:genrateToken(user._id)
    })  
}
const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({
            msg:"Please fill all details"
        })
    }
    const user=await User.findOne({email})
    if(user&&bcrypt.compare(password,user.password)){
        
        res.status(200).json({
            id:user._id,name:user.name,email,address:user.address,token:genrateToken(user._id)
        })
    }else{
        return res.status(409).json({
            msg:"invaild Credential"
        })
    }
    
}

const genrateToken=(id)=>{
    const token=jwt.sign({
        id:id
    },process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
    return token

}

const authController={register,login}

export default authController