import { SearchIcon} from "lucide-react";
import { OrderDateFilter } from "./DateFilter";


type DateRange = { startDate: string; endDate: string; };
type Props = { onFilter: (range: DateRange) => void; };

export function SalesFilter({onFilter}:Props){
    return(
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-xl font-bold ">Recent Orders</h1>
            <OrderDateFilter onFilter={onFilter}/>
        </div>
    )
}