import User from "../models/userModel.js"

const getUsers=async(req,res)=>{
    const users=await User.find()
    if(!users){
       return res.status(404).json({
            msg:"No Users"
        })
    }
    const data =users.map((user)=>({
        id:user._id,
        name:user.name
    }))
    res.status(200).json(data)
  
}
const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(404).json({
            msg:"No User"
        })
    }
    else{
       res.status(200).json({
            id:user._id,
            name:user.name,
            address:user.address
        })
    }
}

const userController={getUser,getUsers}
export default userController