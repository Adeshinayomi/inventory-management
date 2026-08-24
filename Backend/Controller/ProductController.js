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