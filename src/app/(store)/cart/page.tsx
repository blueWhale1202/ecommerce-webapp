import { CartList } from "@/modules/carts/components/cart-list";
import { OrderInformation } from "@/modules/carts/components/order-info";

export default async function CartPage() {
    return (
        <div className="mx-auto w-full max-w-7xl p-6">
            <CartList showDetail />
            <OrderInformation />
        </div>
    );
}
