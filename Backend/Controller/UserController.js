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
          return res.status(400).json({message:'All field are required'})
        }

        const user=await User.findOne({email})
        if(!user){
          return res.status(400).json({message:'Invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
          return  res.status(400).json({message:'Invalid credentials'})
        }

        const token=jwt.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(200).json({message:'Login successful',user,token})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating profile",
    });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    // Get authenticated user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Error changing password",
    });
  }
};