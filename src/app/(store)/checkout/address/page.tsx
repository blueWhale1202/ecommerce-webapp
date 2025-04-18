import { AddressForm } from "@/modules/checkout/components/address-form";
import { CheckoutContent } from "@/modules/checkout/components/content";
import { CheckoutProcess } from "@/modules/checkout/components/process";

export default async function CheckoutPage() {
    return (
        <div className="mx-auto w-full max-w-7xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
            <CheckoutProcess />
            <CheckoutContent>
                <AddressForm />
            </CheckoutContent>
        </div>
    );
}
