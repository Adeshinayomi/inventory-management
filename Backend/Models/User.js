const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
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
        requied:true
    }
},{
    timestamps:true
})

const User=mongoose.model(userSchema,'User')

module.exports=User