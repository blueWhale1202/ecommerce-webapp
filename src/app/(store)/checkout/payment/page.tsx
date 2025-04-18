import { CheckoutContent } from "@/modules/checkout/components/content";
import { PaymentForm } from "@/modules/checkout/components/payment-form";
import { CheckoutProcess } from "@/modules/checkout/components/process";

export default async function ShippingPage() {
    return (
        <div className="mx-auto w-full max-w-7xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
            <CheckoutProcess />
            <CheckoutContent>
                <PaymentForm />
            </CheckoutContent>
        </div>
    );
}
