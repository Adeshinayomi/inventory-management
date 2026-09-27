const User=require('../Models/User.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.createUser=async(req,res)=>{
    try{
        const {name,email,role,phone,password}=req.body

        if(!name || !email || !phone || !password){
            res.status(400).json({message:'All field are required'})
        }

        const existingUser= await User.findOne({email,phone})
        if(existingUser){
            res.status(400).json({message:'User already exist'})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser= await User.create({
            name,
            email,
            role,
            phone:Number(phone),
            password:hashedPassword
        })

        res.status(201).json({message:'User created successfully',user:newUser})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            res.status(400).json({message:'All field are required'})
        }

        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({message:'Invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:'Invalid credentials'})
        }

        const token=jwt.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(200).json({message:'Login successful',user,token})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.updateUser=async (req,res)=>{
    try{
        const {id}=req.params
        const {name,email,phone}=req.body

        if(!name || !email || !phone){
            res.status(400).json({message:'All field are required'})
        }

        const existingUser =await  User.findById(id)
        if(!existingUser){
            res.status(404).json({message:"User Not Found"})
        }

        const user =await User.findByIdAndUpdate(id,{name,email,phone})

        res.status(200).json({
            message:"User updated sucessfully",
            user
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}