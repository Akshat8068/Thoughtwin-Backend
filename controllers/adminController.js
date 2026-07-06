import User from "../models/userModel.js"

const getUsers=async(req,res)=>{
    const users=await User.find()
    if(!users){
        res.status(404).json({
            msg:"No Users"
        })
    }
    else{
        res.status(200).json(users)
    }
}
const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(404).json({
            msg:"No User"
        })
    }
    else{
        res.status(200).json(user)
    }
}
const updateUsers=async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user){
        res.status(404).json({
            msg:"No User"
        })
    }
    else{
        res.status(200).json(user)
    }
}
const removeUsers=async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        res.status(404).json({
            msg:"No User"
        })
    }
    else{
        res.status(200).json({
            msg:"User Deleted"
        })
    }
}

const adminController={getUser,getUsers,updateUsers,removeUsers}
export default adminController

