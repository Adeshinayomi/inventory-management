"use client"

import { SalesHeader } from "./component/SalesHeader"
import { SalesStats } from "./component/SalesStats"
import { SalesFilter } from "./component/SalesFilter";
import { SalesTable } from "./component/SalesTable";
import { useState,useEffect,useMemo} from "react";
import { getOrders,Order } from "@/lib/sales";
import { useRouter } from "next/navigation";

function SalesPage(){
    const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (
    startDate?: string,
    endDate?: string
  ) => {
    try {
      setLoading(true);

      const data = await getOrders(
        startDate,
        endDate
      );

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load all orders initially
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    fetchOrders(startDate, endDate);
  };
    return(
        <section className="grid gap-5 px-5 mt-8">
            <SalesHeader />
            <SalesStats />
            <div>
                <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
                    <SalesFilter onFilter={handleFilter}/>
                    <SalesTable items={orders} />
                </div>
            </div>
        </section>
    )
}

export default SalesPage



