const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Config/DatabaseConfig");
const userRoute = require("./Routes/UserRoute.js");
const productRoute = require("./Routes/ProductRoute.js");
const inventoryRoute = require("./Routes/InventoryRoute.js");
const OrderRoute=require('./Routes/OrderRoute.js')
const PurchaseRoute=require('./Routes/PurchaseRoute.js')

app.use(express.json());
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/inventory', inventoryRoute);
app.use('/orders',OrderRoute)
app.use('/product',PurchaseRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});