const Store = require("../Models/Store");
const User = require("../Models/User");
const bcrypt = require('bcryptjs')
exports.registerStore = async (req, res) => {
  try{
    const {storeName, storeAddress, storeEmail, storePhone,name,email,password,phone} = req.body;

    if(!storeName || !storeAddress || !storeEmail || !storePhone){
      return res.status(400).json({message:"All fields are required"});
    }

    const existingStore = await Store.findOne({storeName});
    if(existingStore){
      return res.status(400).json({message:"Store already exists"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const store = new Store({
      storeName,
      storeAddress,
      storeEmail,
      storePhone
    });

    await store.save();

    const newUser = await User.create({
      name,
      email,
      phone:Number(phone),
      password:hashedPassword,
      role:'owner',
      store:store._id
    })
    return res.status(201).json({
      message: "Store registered successfully",
      storeName,
      storeAddress,
      storeEmail,
      storePhone,
      owner: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      }
    });
  } catch (error) {
    console.error("Register store error:", error);
    return res.status(500).json({
      message: "Error registering store"
    });
  }
};


exports.updateStore = async (req, res) => {
  try {
    const {
      storeName,
      storeAddress,
      storeEmail,
      storePhone
    } = req.body;

    const storeId = req.storeId;
    if (!storeName || !storeAddress || !storeEmail || !storePhone) {
      return res.status(400).json({
        message: "All store fields are required",
      });
    }

    const store = await Store.findOne({ _id: storeId });

    if (!store) {
      return res.status(404).json({
        message: "Store information not found",
      });
    }

    store.storeName = storeName;
    store.storeAddress = storeAddress;
    store.storeEmail = storeEmail;
    store.storePhone = storePhone;

    await store.save();

    return res.status(200).json({
      message: "Store information updated successfully",
      store,
    });
  } catch (error) {
    console.error("Update store error:", error);

    return res.status(500).json({
      message: "Error updating store information",
    });
  }
};

exports.getStoreInfo = async (req, res) => {
  try {
    const storeId = req.storeId;
    const store = await Store.findById(storeId);
    
    if (!store) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    return res.status(200).json({
      store
    });
  } catch (error) {
    console.error("Get store info error:", error);
    return res.status(500).json({
      message: "Error fetching store information"
    });
  }
};
