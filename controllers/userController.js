const register=async (req,res)=>{
    const {name,email,password,address}=req.body
    if(!name||!email||!password){
        res.status(400).json({
            msg:"Please Fill req Details, and Req details are name email password"
        })
    }
    res.status(200).json({
        msg:"Register API"
    })
}
const login=async (req,res)=>{
    res.status(200).json({
        msg:"login API"
    })
}

const userController={register,login}

export default userController