import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

const app = express();
dotenv.config()
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to MongoDB😊")
}).catch((err)=>{
    console.log(err)
})



app.use('/api/user',userRoutes)



export default app;