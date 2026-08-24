const Product = require("../Models/Product.js");
const cloudinary = require("../Config/CloudinaryConfig.js");
const sendMail = require("../Middleware/emailSender.js");
const generateId = require("../Utils/generateId.js");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, threshold } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "Inventory-Products",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(req.file.buffer);
    });
    const productId = generateId(name);

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = await Product.create({
      name,
      sku: productId,
      description,
      price:Number(price),
      stock:Number(stock),
      threshold,
      category,
      image: result.secure_url
    });

    const emailSubject = "New Product Added";
    const emailBody = `A new product has been added to the inventory:\n\nName: ${name}\nDescription: ${description}\nPrice: ${price}\nStock: ${stock}\nCategory: ${category}`;

    await sendMail(req.user.email, emailSubject, emailBody);

    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}

exports.getProductById = async (req, res) => { 
    try{
        const product=await Product.findOne({ sku: req.params.sku })
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        res.status(200).json({ product });
    }catch(error){
        res.status(500).json({message:error.message})
    }
} 

exports.restockProduct = async (req, res) => {
    try {
        const { stock } = req.body;
        if (!stock) {
            return res.status(400).json({ message: "Stock value is required" });
        }
        const product = await Product.findOne({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.stock+=Number(stock);
        await product.save();
        res.status(200).json({ message: "Product stock updated successfully", product });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, threshold } = req.body;
        const product = await Product.findOne({ sku: req.params.sku });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        Object.assign(product, { name, description, price, category, threshold });

        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        res.status(200).json({ totalProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } });
        res.status(200).json({ lowStockProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAvailableProducts = async (req, res) => {
    try {
        const availableProducts = await Product.find({ available: true });
        res.status(200).json({ availableProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUnavailableProducts = async (req, res) => {
    try {
        const unavailableProducts = await Product.find({ available: false });
        res.status(200).json({ unavailableProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProductAvailability = async (req, res) => {
    try {
        const product = await Product.findOne({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.available = !product.available;
        await product.save();
        res.status(200).json({ message: "Product availability updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTotalInventoryValue = async (req, res) => {
    try {
        const totalInventoryValue = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ["$price", "$stock"] } }
                }
            }
        ]);
        res.status(200).json({ totalInventoryValue: totalInventoryValue[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
