import { ConfirmDialog } from "@/components/confirm-dialog";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useGetCart } from "../apis/get";
import { useRemoveToCart } from "../apis/remove";
import { useUpdateToCart } from "../apis/update";

type Props = {
    item: NonNullable<ReturnType<typeof useGetCart>["data"]>["results"][number];
};

export const CartItem = ({ item }: Props) => {
    const update = useUpdateToCart();
    const remove = useRemoveToCart();

    const [open, setOpen] = useState(false);

    const onUpdateQuantity = (quantity: number) => {
        if (quantity < 1) {
            return;
        }

        update.mutate({
            cartItemId: item.cartItemId,
            quantity,
        });
    };

    const onRemove = () => {
        remove.mutate(
            { cartItemId: item.cartItemId },
            {
                onError(error) {
                    console.error("Error removing item from cart:", error);
                    toast.error(
                        "Error removing item from cart. Please try again.",
                    );
                },
                onSettled() {
                    setOpen(false);
                },
            },
        );
    };

    const href = `/product/${item.slug}`;
    const disabled = remove.isPending || update.isPending;

    return (
        <>
            <div
                key={item.cartItemId}
                className="border-b border-gray-200 pb-6"
            >
                <div className="flex gap-4">
                    <div className="h-24 w-24 shrink-0 bg-[#c4c4c4]">
                        <Link href={href}>
                            <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                            />
                        </Link>
                    </div>
                    <div className="flex-grow space-y-3">
                        <div className="flex justify-between">
                            <h3 className="font-medium hover:underline">
                                <Link href={href}>{item.name}</Link>
                            </h3>
                            <p className="font-medium">${item.price}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                            Size: {item.size}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex w-24 items-center rounded-md border border-gray-300">
                                <button
                                    className="px-2 py-1"
                                    onClick={() =>
                                        onUpdateQuantity(item.quantity - 1)
                                    }
                                    disabled={disabled || item.quantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                </button>
                                <span className="flex-grow text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    className="px-2 py-1"
                                    onClick={() =>
                                        onUpdateQuantity(item.quantity + 1)
                                    }
                                    disabled={disabled}
                                >
                                    <Plus className="h-3 w-3" />
                                </button>
                            </div>
                            <button
                                className="text-sm underline"
                                onClick={() => setOpen(true)}
                                disabled={disabled}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title="Remove item from cart?"
                message="Are you sure you want to remove this item from your cart?"
                onConfirm={() => onRemove()}
                onCancel={() => setOpen(false)}
                disabled={remove.isPending}
            />
        </>
    );
};
