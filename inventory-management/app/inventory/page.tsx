import Iphone11 from "../../public/iphone-image.jpg";
import {ChevronLeft , ChevronRight} from "lucide-react"
import { InventoryFilters } from "./components/InventoryFilters";
import { InventoryHeader } from "./components/InventoryHeader";
import { inventoryItems } from "./components/inventory-data";
import { InventoryStats } from "./components/InventoryStats";
import { InventoryTable } from "./components/InventoryTable";

function InventoryPage() {
  return (
    <section className="grid gap-5 px-5 mt-8">
        <InventoryHeader />
        <InventoryStats />
        <div>
            <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
                <InventoryFilters />
                <InventoryTable items={inventoryItems} productImage={Iphone11} />
                <div className="flex justify-between text-text-secondary">
                    <p className="font-medium">
                        showing 1 to 10 out of 1250
                    </p>
                    <div className="flex gap-2">
                        <button>
                            <ChevronLeft />
                        </button>
                        <div className="flex gap-2 ">
                            <span className={`bg-primary text-surface px-2 rounded-md`}>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>...</span>
                        </div>
                        <button>
                            <ChevronRight/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}   

export default InventoryPage;
