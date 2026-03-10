const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

const registerController = async(req,res)=>{
    try {
        const {name , email, password} = req.body;
        console.log(name, email, password);

        if(!name || !email|| !password){
            return res.status(400).json({message:"Fill All Fields"})
        }

       const userExist = await userModel.findOne({email})
       if(userExist){
        return res.status(400).json({message:"user already exist"})
       }


        const hashPassword = await bcrypt.hash(password,10);
        
        const user = await userModel.create({
            name,
            email,
            password :hashPassword
        })
        await user.save();

        res.status(201).json({message:"User registered successfully",success:true, user})

        
    } catch (error) {
        res.status(500).json({message:"error in register"})
    }
    
}

const loginController = async(req,res)=>{
   try {
    const {email , password} = req.body

    if(!email || !password){
            return res.status(400).json({message:"Fill All Fields"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"Incorrrect email and password" , success:false})
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({message:"Incorrrect email and password" , success:false})

        }

        const token = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:"1h"});

        res.cookie("token", token, {
  httpOnly: true
});
        res.status(201).json({message:" User login successfully",token})
   } catch (error) {
    res.status(500).json({message:"error in login"})
   }
    
}

module.exports = {
    registerController,
    loginController
}