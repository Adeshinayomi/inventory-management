"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLowStockProducts, type Product } from "@/lib/inventory";


export function LowStocks() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getLowStockProducts()
      .then((data) => setProducts(data.products.slice(0, 5)))
      .catch(console.error);
  }, []);

   return (
    //low stocks table
    <div className="border border-border rounded-md p-4 w-[45%]">
        <div className="flex justify-between items-center mb-4 pr-4">
            <h1 className="text-xl font-bold">Low Stocks</h1>
            <button className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                <Link href={'/inventory'}>View All</Link>
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
                {products.map((item) => (  
                    <tr key={item._id} className="border-b border-border py-2">
                        <td className="text-left text-sm py-3 flex items-center gap-2">
                            <img src={item.image} alt={item.name} className="w-1/2 h-10 object-cover rounded-sm"/>
                            <span className="w-full overflow-hidden text-ellipsis" title={item.name}>
                                {item.name}
                            </span>
                        </td>
                        <td className="text-center text-sm py-3">{item.stock}</td>
                        <td className="text-center text-sm py-3">{item.threshold}</td>
                        <td className={`text-center text-sm py-3 ${item.stock <= 2 ? "text-red-500" : item.stock <= 5 ? "text-yellow-500" : "text-green-500"}`}>
                            {item.stock <= 2 ? "Critical" : item.stock <= 5 ? "Low" : "Sufficient"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
   )
}