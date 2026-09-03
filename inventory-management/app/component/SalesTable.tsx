import {ChevronRight,Briefcase} from "lucide-react";
export function SalesTable() {
    const Sales= [
        {
            id: 1001,
            customer: "John Doe",
            date: "2023-01-15",
            status: "Pending",
            amount: 25000,
        },
        {
            id: 1002,
            customer: "Jane Smith",
            date: "2023-01-16",
            status: "Completed",
            amount: 30000,
        },
        {
            id: 1003,
            customer: "Michael Johnson",
            date: "2023-01-17",
            status: "Completed",
            amount: 15000,
        },
        {
            id: 1004,
            customer: "Emily Davis",
            date: "2023-01-18",
            status: "Cancelled",
            amount: 20000,
        },
        {
            id: 1005,
            customer: "William Brown",
            date: "2023-01-19",
            status: "Pending",
            amount: 18000,
        }
    ];
  return (
    <div className="border border-border rounded-md p-4 w-[55%]">
        <div className="flex justify-between items-center mb-4 pr-4">
            <h1 className="text-xl font-bold">Recent Sales</h1>

            <button className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                View All
            </button>
        </div>
        <table className="table w-full">
            <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                    <th className="text-left text-md w-[150px]">Sale ID</th>
                    <th className="text-left text-md w-[200px]">Customer</th>
                    <th className="text-left text-md w-[150px]">Date</th>
                    <th className="text-center text-md w-[100px] ">Amount</th>
                    <th className="text-center text-md w-[150px]">Status</th>
                </tr>
            </thead>
            <tbody>
                {Sales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border">
                        <td className="text-sm py-4 flex items-center">
                            <Briefcase size={30} className="inline-block mr-1 text-primary bg-primary/10 p-1 rounded-sm" />
                            <span>#{sale.id}</span>
                        </td>
                        <td className="text-sm py-4">{sale.customer}</td>
                        <td className="text-sm py-4">{sale.date}</td>
                        <td className="text-sm text-center py-4">₦{sale.amount.toLocaleString()}</td>
                        <td className={`text-center text-sm py-4 ${sale.status === "Completed" ? "text-green-500" : sale.status === "Cancelled" ? "text-red-500" : "text-yellow-500"}`}>
                            {sale.status}
                        </td>
                        <td className="py-2"><ChevronRight size={16} className="inline-block ml-1 text-black" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}