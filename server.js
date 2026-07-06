import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
import userRoutes from "./routes/userRoute.js"
dotenv.config()
connectDB()

const app=express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded())
app.use("/api/user",userRoutes)
app.get("/about",(req,res)=>{
    res.send("hello")
})
app.listen(8080,()=>{
    console.log("server  running",PORT)
})