import Image from "next/image";
import Iphone11 from '../../public/iphone-image.jpg'
export function LowStocks() {
    const lowStockItems = [
        { id: 1, name: "Iphone 11", stockLevel: 5, threshold: 10 },
        { id: 2, name: "Air Pods", stockLevel: 3, threshold: 5 },
        { id: 3, name: "Iphone xr", stockLevel: 1, threshold: 5 },
        { id: 4, name: "Smartwatch", stockLevel: 2, threshold: 5 },
        {
            id: 5,
            name: "Wireless Charger",
            stockLevel: 0,
            threshold: 5,
        }
    ];
   return (
    //low stocks table
    <div className="border border-border rounded-md p-4 w-[45%]">
        <div className="flex justify-between items-center mb-4 pr-4">
            <h1 className="text-xl font-bold">Low Stocks</h1>
            <button className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                View All
            </button>
        </div>
        <table className="table w-full">
            <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                    <th className="text-left text-md w-[200px]">Product</th>
                    <th className="text-center text-md w-[200px]">Stock</th>
                    <th className="text-center text-md w-[200px]">Threshold</th>
                    <th className="text-center text-md w-[150px]">Status</th>
                </tr>
            </thead>
            <tbody>
                {/* Low stock items would be listed here */}
                {lowStockItems.map((item) => (  
                    <tr key={item.id} className="border-b border-border py-2">
                        <td className="text-left text-sm py-2 flex items-center gap-2">
                            <Image src={Iphone11} alt={item.name} className="w-1/4 h-12 object-cover rounded-sm" />
                            <span className="w-full overflow-hidden text-ellipsis" title={item.name}>
                                {item.name}
                            </span>
                        </td>
                        <td className="text-center text-sm py-2">{item.stockLevel}</td>
                        <td className="text-center text-sm py-2">{item.threshold}</td>
                        <td className={`text-center text-sm py-2 ${item.stockLevel <= 2 ? "text-red-500" : item.stockLevel <= 5 ? "text-yellow-500" : "text-green-500"}`}>
                            {item.stockLevel <= 2 ? "Critical" : item.stockLevel <= 5 ? "Low" : "Sufficient"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
   )
}