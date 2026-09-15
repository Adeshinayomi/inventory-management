"use client"
import { StatsCard } from "./component/StatsCard";
import { SalesTable } from "./component/SalesTable";
import { LowStocks } from "./component/LowStocks";
import  TopSellingCategory from "./component/PieChart"
import SalesChart from "./component/BarChart";
import { useState, useEffect } from "react";
import { getDashboardStats, type DashboardStats } from "@/lib/dashboard";
import { useRouter } from "next/navigation";
type userProp ={
    name:string,
    email:string,
    phone:number,
    role:string
}
export default function Home() {
  const [user, setUser] = useState<userProp | null>(null);
  useEffect(() => { 
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      } 
  }, []);

  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalUnit: 0,
    lowStocks: 0,
    totalRevenue: 0
  });

  useEffect(() => {
      getDashboardStats().
      then((data)=>{
        setStats(data)
      }).catch((error)=>{
          console.log(error.message)
          router.replace('/login')
      })
  }, []);

  
  return (
    <section className="grid gap-5 px-5 mt-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">Welcome back,{user?.name}!</h1>
        <p className="text-muted-foreground text-sm">
          here is what is happening in your store today.
        </p>
      </div>
      <div className="flex justify-between">
        {Object.entries(stats).map(([stat, value]) => (
          <StatsCard key={stat} stat={stat} value={value} />
        ))}
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex items-center">
          <TopSellingCategory/>
        </div>
        <div className="w-full">
          <SalesChart />
        </div>
      </div>

      <div className="flex gap-2">
        <SalesTable />
        <LowStocks />
      </div>
    </section>
  );
}
