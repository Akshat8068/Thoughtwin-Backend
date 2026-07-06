import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Your Name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Enter Your Email"]
    },
    password:{
        type:String,
        required:[true,"Enter Your Password"]
    },
    address:{
        type:String,
        required:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User =mongoose.model("User",userSchema)

export default User