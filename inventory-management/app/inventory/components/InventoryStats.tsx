"use client"
import { useRouter } from "next/navigation";
import { InventoryStats, getInventoryStats } from "@/lib/inventory";
import { StatsCard } from "@/app/component/StatsCard"
import { useState,useEffect } from "react";
export function Stats(){
    const router = useRouter()
      const [stats, setStats] = useState<InventoryStats>({
        outOfStock:0, 
        totalUnit:0, 
        lowStocks:0,
        inventoryValue:0 
      });
    
      useEffect(() => {
          getInventoryStats().
          then((data)=>{
            setStats(data)
          }).catch((error)=>{
              console.log(error.message)
          })
      }, []);
    
    return(
        <div className="flex justify-between">
            {Object.entries(stats).map(([stat, value]) => (
            <StatsCard key={stat} stat={stat} value={value} />
            ))}
        </div>
    )
}