import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

const app = express();
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to MongoDB😊")
}).catch((err)=>{
    console.log(err)
})



app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error😥!'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



export default app;