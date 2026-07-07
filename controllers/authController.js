import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cookiesoptions from "../utlis/cookieOptions.js"
const register = async (req, res) => {
    const { name, email, password, address } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "Please Fill req Details, and Req details are name email password"
        })
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(409).json({
            msg: "user already exist"
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hashedpassword, address })
    if (!user) {
        res.status(404).json({ msg: "user not created" })
    }
    res.status(201).json({
        id: user._id, name, email, address
    })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            msg: "Please fill all details"
        })
    }
    const user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = genrateAccessToken(user._id)
        const refreshToken = genrateRefershToken(user._id)

        res.cookie("refreshToken", refreshToken, cookiesoptions)
        res.status(200).json({
            id: user._id, name: user.name, email, address: user.address, accessToken
        })
    } else {
        return res.status(409).json({
            msg: "invaild Credential"
        })
    }

}
const refreshToken = (req, res) => {

    //Req body se Token 
    //     const token=req.body.refreshToken
    //     if(!token){
    //         return res.status(500).json({
    //             msg:"Invalid Refersh token"
    //         })
    //     }
    //     let decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET)
    //     const user = await User.findById(decoded.id)
    //     const accessToken=genrateAccessToken(decoded.id)
    //     res.json({accessToken})
    // cookies se 

    const token = req.cookie.refreshToken
    if (!token) {
        return res.status(500).json({
            msg: "Invalid Refersh token"
        })
    }
    let decoded = jwt.verify(token, process.removeListener.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)
    if(!user){
        return res.status(200).json("No user find")
    }
    const accessToken=genrateAccessToken(decoded.id)
    res.status(200).json({accessToken})

}

const genrateAccessToken = (id) => {
    const token = jwt.sign({
        id: id
    }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '10m'
    })
    return token
}
const genrateRefershToken = (id) => {
    const token = jwt.sign({
        id: id
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '10d'
    })
    return token
}

const authController = { register, login, refreshToken }

export default authController