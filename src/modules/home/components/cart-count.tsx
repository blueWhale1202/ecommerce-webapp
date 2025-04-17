"use client";

import { cn } from "@/lib/utils";
import { useGetCart } from "@/modules/carts/apis/get";

type Props = {
    variant?: "light" | "dark";
};

export const CartCount = ({ variant = "light" }: Props) => {
    const { isPending, data, error } = useGetCart();

    if (isPending || error || !data) {
        return null;
    }

    return (
        <span
            className={cn(
                "absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-black text-xs text-white",
                variant === "dark" && "bg-white text-black",
            )}
        >
            {data.results.length}
        </span>
    );
};
