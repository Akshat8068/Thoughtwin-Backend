import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
import authRoutes from "./routes/authRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import userRoutes from "./routes/userRoute.js"
dotenv.config()
connectDB()

const app=express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded())
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/users",userRoutes)
app.get("/about",(req,res)=>{
    res.send("hello")
})
app.listen(8080,()=>{
    console.log("server  running",PORT)
})