import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const singup =async (req,res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password || username==="" || password==="" || email===""){
        res.status(400).json({message: "All fields are required🥴!"})
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User ({
        username,email,password:hashedPassword
    })

    try {
        await newUser.save()
    res.json("Sing-up Successfully Created👍")
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

    


}