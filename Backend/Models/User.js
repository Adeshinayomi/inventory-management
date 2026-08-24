const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        Enum:['owner','storekeeper'],
        default:'owner'
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)

module.exports=User