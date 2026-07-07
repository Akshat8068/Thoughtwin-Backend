import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
import authRoutes from "./routes/authRoute.js"
import adminRoutes from "./routes/adminRoute.js"

import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoute.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
dotenv.config()
connectDB()

const app=express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/users",userRoutes)
app.get("/about",(req,res)=>{
    res.send("hello")
})
app.use(errorMiddleware)
app.listen(8080,()=>{
    console.log("server  running",PORT)
})