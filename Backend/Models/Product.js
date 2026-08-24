const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    threshold:{
        type:Number,
        default:5
    },
    image:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    },
    category:{
        type:String,
        Enum:['Electronics','Clothing','Books','Gadgets','Foods','Other'],
        required:true
    }
},
{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema)

module.exports=Product