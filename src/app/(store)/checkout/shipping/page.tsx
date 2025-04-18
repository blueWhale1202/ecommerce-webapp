import { CheckoutContent } from "@/modules/checkout/components/content";
import { CheckoutProcess } from "@/modules/checkout/components/process";
import { ShippingForm } from "@/modules/checkout/components/shipping-form";

export default async function ShippingPage() {
    return (
        <div className="mx-auto w-full max-w-7xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
            <CheckoutProcess />
            <CheckoutContent>
                <ShippingForm />
            </CheckoutContent>
        </div>
    );
}
