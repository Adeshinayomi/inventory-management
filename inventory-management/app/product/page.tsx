import Iphone11 from "../../public/iphone-image.jpg";
import { ProductHeader } from "./components/ProductHeader";
import { ProductStats } from "./components/ProductStats";
import { ProductFilter } from "./components/ProductFilter";
import { ProductItems } from "./components/product-data";
import { ProductTable } from "./components/ProductTable";
function ProductPage(){
    return(
        <section className="grid gap-5 px-5 mt-8">
            <ProductHeader />
            <ProductStats />
            <div>
                <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
                    <ProductFilter/>
                    <ProductTable items={ProductItems} productImage={Iphone11} />
                </div>
            </div>
        </section>
    )
}

export default ProductPage;