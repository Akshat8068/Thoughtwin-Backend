const errorMiddleware=(err,req , res ,next)=>{
    let responseCode= res.statusCode<=200?500:res.statusCode
    res.status(responseCode)
    res.json({
        message:err.message
    })
    
}
export default errorMiddleware