"use client";

import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useGetCart } from "../apis/get";
import { CartItem } from "./cart-item";

export const CartList = () => {
    const { isPending, error, data } = useGetCart();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading cart</div>;
    }

    if (!data || data.results.length === 0) {
        return <div>No items in cart</div>;
    }

    const { results: cartItems, subtotal } = data;

    return (
        <div className="flex flex-col gap-x-20 gap-y-8 lg:flex-row">
            <div className="lg:w-2/3">
                <h1 className="mb-2 text-3xl font-bold">Your cart</h1>
                <p className="mb-6">
                    Not ready to checkout?{" "}
                    <Link href="/shop" className="underline">
                        Continue Shopping
                    </Link>
                </p>

                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <CartItem key={item.cartItemId} item={item} />
                    ))}
                </div>
            </div>

            <div className="lg:w-1/3">
                <div className="rounded-md bg-white p-6 shadow-sm">
                    <h2 className="mb-14 text-xl font-bold">Order Summary</h2>

                    <div className="mb-6 space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Calculated at the next step</span>
                        </div>
                        <div className="h-px w-full bg-gray-200"></div>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full rounded-md bg-black py-3 text-white">
                        Continue to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
