const Product = require("../Models/Product.js");
const Sale = require("../Models/Order.js")
exports.getDashboardStats = async (req,res)=>{
  try{

    const lowStocks = await Product.find({
          $expr: {
              $lte: ["$stock", "$threshold"]
          }
    }).countDocuments();
    const totalSales = await Sale.aggregate([
        {
        $group: {
            _id: null,
            totalSales: {
            $sum: "$totalAmount",
            },
        },
        },
    ]);
    const inventoryValue = await Product.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: {
                        $multiply: ["$price", "$stock"]
                    }
                }
            }
        }
    ]);
    const totalUnit = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalStock: {
                    $sum: "$stock"
                }
            }
        }
    ]);
    
    res.status(200).json({
      totalUnit:totalUnit[0]?.totalStock || 0,
      inventoryValue: inventoryValue[0]?.total || 0,
      totalSales:totalSales[0]?.totalSales || 0,
      lowStocks,
    })
  }catch(error){
    res.status(500).json({message:error.message})
  }
}