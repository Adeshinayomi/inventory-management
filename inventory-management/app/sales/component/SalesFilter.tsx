import { SearchIcon} from "lucide-react";
import { OrderDateFilter } from "./DateFilter";


type DateRange = { startDate: string; endDate: string; };
type Props = { onFilter: (range: DateRange) => void; };

export function SalesFilter({onFilter}:Props){
    return(
        <div className="w-full flex justify-between items-center ">
            <h1 className="text-xl font-bold ">Recent Orders</h1>
            <OrderDateFilter onFilter={onFilter}/>
        </div>
    )
}