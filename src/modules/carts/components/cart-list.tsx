"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGetCart } from "../apis/get";
import { CartItem, CartItemSkeleton } from "./cart-item";
import { CartSummary } from "./summary";

type Props = {
    showDetail?: boolean;
    showCoupon?: boolean;
};

export const CartList = ({ showDetail = false, showCoupon }: Props) => {
    const { isPending, error, data } = useGetCart();

    if (error) {
        return <div>Error loading cart</div>;
    }

    return (
        <div
            className={cn(
                "my-12 flex flex-col gap-x-20 gap-y-8 lg:flex-row",
                !showDetail && "mt-0 lg:flex-col",
            )}
        >
            <div className={cn(showDetail ? "lg:w-2/3" : "w-full")}>
                <h1
                    className={cn(
                        "mb-5 text-2xl font-bold",
                        showDetail && "mb-2 text-3xl",
                    )}
                >
                    Your cart
                </h1>
                {showDetail && (
                    <p className="mb-6">
                        Not ready to checkout?{" "}
                        <Link href="/shop" className="underline">
                            Continue Shopping
                        </Link>
                    </p>
                )}

                <div className="space-y-6">
                    {isPending ? (
                        <CartListSkeleton />
                    ) : (
                        data.results.map((item) => (
                            <CartItem key={item.cartItemId} item={item} />
                        ))
                    )}
                </div>
            </div>

            <CartSummary
                isPending={isPending}
                subtotal={data?.subtotal}
                showTitle={showDetail}
                className={cn(showDetail ? "lg:w-1/3" : "mb-6 space-y-4")}
                showCoupon={showCoupon}
            />
        </div>
    );
};

export const CartListSkeleton = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <CartItemSkeleton key={index} />
            ))}
        </>
    );
};
