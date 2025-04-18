import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { useGetCheckout } from "@/modules/checkout/apis/get";
import { SHIPPING_OPTIONS } from "@/modules/checkout/constants";
import Link from "next/link";
import { HTMLAttributes, useMemo } from "react";

type Props = {
    showTitle?: boolean;
    isPending: boolean;
    subtotal?: number;
    showCoupon?: boolean;
    className?: HTMLAttributes<HTMLDivElement>["className"];
};

export const CartSummary = ({
    showTitle = true,
    isPending = false,
    subtotal,
    showCoupon = false,
    className,
}: Props) => {
    const { data } = useGetCheckout();

    const shippingPrice = useMemo(() => {
        if (!data || !data.shippingMethod) return 0;

        const shippingOption = SHIPPING_OPTIONS.find(
            (option) => option.id === data.shippingMethod,
        );

        return shippingOption?.price || 0;
    }, [data]);

    return (
        <div className={className}>
            <div
                className={cn(
                    "rounded-md bg-white p-6",
                    showTitle && "shadow-md",
                )}
            >
                {showTitle && (
                    <h2 className="mb-14 text-xl font-bold">Order Summary</h2>
                )}

                {showCoupon && (
                    <form className="-mt-6 mb-6 flex items-center space-x-2">
                        <Input
                            placeholder="Enter coupon code here"
                            className="flex-1"
                        />
                        <Button>Apply</Button>
                    </form>
                )}

                <div className="mb-6 space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <SubtotalSkeleton isPending={false} price={subtotal} />
                    </div>
                    <div className="flex justify-between gap-x-4">
                        <span>Shipping</span>
                        <span>
                            {shippingPrice > 0
                                ? formatPrice(shippingPrice)
                                : "Calculated at the next step"}
                        </span>
                    </div>
                    <div className="h-px w-full bg-gray-200"></div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <SubtotalSkeleton
                            isPending={isPending}
                            price={subtotal}
                        />
                    </div>
                </div>

                {showTitle && (
                    <Button asChild size="lg" className="w-full">
                        <Link href="/checkout/address">
                            Continue to checkout
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export const SubtotalSkeleton = ({
    isPending,
    price,
}: {
    isPending: boolean;
    price?: number;
}) => {
    if (isPending || !price) {
        return <Skeleton className="h-5 w-16" />;
    }

    return <span>{formatPrice(price)}</span>;
};
