import { Filter, SearchIcon,CalendarDays } from "lucide-react";

export function SalesFilter(){
    return(
        <div className="w-full flex justify-between items-center mb-2">
        <div className="w-1/2 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
            type="text"
            placeholder="Search Inventory..."
            className="w-full px-10 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
        <div className="relative flex gap-2">
            <CalendarDays className="absolute left-3 top-2"/>
            <select className="px-8 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="" className="flex items-center gap-2"> This Month</option>
            <option value="last month"> Last Month</option>
            <option value="febraury">Febraury</option>
            <option value="janauary">January</option>
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            <Filter size={20} className="inline-block mr-1" />
            Filter
            </button>
        </div>
        </div>
    )
}