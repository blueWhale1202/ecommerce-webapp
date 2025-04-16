import { FiltersProduct } from "./filters";
import { ProductList } from "./product-list";

export const ShopContent = () => {
    return (
        <section className="flex-grow bg-[#eff2f6] px-6 py-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:flex-row">
                    <FiltersProduct />
                    <ProductList />
                </div>
            </div>
        </section>
    );
};
