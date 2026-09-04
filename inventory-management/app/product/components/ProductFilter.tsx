import { Filter, SearchIcon } from "lucide-react";

export function ProductFilter(){
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
        <div className="flex gap-2">
            <select className="px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Status</option>
            <option value="In-Stock">In-Stock</option>
            <option value="Out-of-Stock">Out Of Stock</option>
            <option value="Low-Stock">Low Stocks</option>
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            <Filter size={20} className="inline-block mr-1" />
            Filter
            </button>
        </div>
        </div>
    )
}