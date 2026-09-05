import { SalesHeader } from "./component/SalesHeader"
import { SalesStats } from "./component/SalesStats"
import { SalesFilter } from "./component/SalesFilter";
import { SalesItems } from "./component/Sales-data";
import { SalesTable } from "./component/SalesTable";
function SalesPage(){
    return(
        <section className="grid gap-5 px-5 mt-8">
            <SalesHeader />
            <SalesStats />
            <div>
                <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
                    <SalesFilter/>
                    <SalesTable items={SalesItems} />
                </div>
            </div>
        </section>
    )
}

export default SalesPage