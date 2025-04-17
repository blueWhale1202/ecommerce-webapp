"use client";

import {
    ImageCarousel,
    ImageCarouselSkeleton,
} from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { Check, Heart, Minus, Plus, Share2 } from "lucide-react";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useGetProduct } from "../apis/get";
import { SIZES } from "../constants";

type Props = {
    slug: string;
};

export const ProductDetails = ({ slug }: Props) => {
    const { isPending, error, data: product } = useGetProduct(slug);
    const [order, setOrder] = useImmer({
        size: "",
        color: "",
        quantity: 1,
    });

    if (isPending) {
        return <ProductDetailsSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    console.log("product", product._id);
    console.log("colorMap", product.colorMap);
    console.log("order.color", order.color);

    return (
        <div className="mx-auto my-24 flex max-w-7xl flex-col gap-8 p-6 md:flex-row">
            <div className="md:w-1/2">
                <ImageCarousel imageUrls={product.imageUrls} />
            </div>

            <div className="md:w-1/2">
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="flex space-x-2">
                            <button>
                                <Heart className="size-6" />
                            </button>
                            <button>
                                <Share2 className="size-6" />
                            </button>
                        </div>
                    </div>

                    <p className="text-2xl font-bold">
                        {formatPrice(product.price)}
                    </p>

                    <p className="text-gray-700">{product.description}</p>

                    <div>
                        <h3 className="mb-2 text-gray-500">Color</h3>
                        <div className="flex space-x-2">
                            {product.colors.map((color) => (
                                <div key={color} className="relative h-10 w-10">
                                    <button
                                        key={color}
                                        className="absolute h-10 w-10 rounded-full border border-gray-300 transition-all duration-200 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                            setOrder((draft) => {
                                                draft.color = color;
                                            })
                                        }
                                        disabled={
                                            !!order.size &&
                                            !product.sizeMap[
                                                order.size
                                            ]?.includes(color)
                                        }
                                    />

                                    {color === order.color && (
                                        <Check className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-white" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-gray-500">Size</h3>
                        <div className="grid grid-cols-7 gap-2">
                            {SIZES.map((size) => {
                                if (!product.sizes.includes(size)) {
                                    return null;
                                }
                                return (
                                    <Button
                                        key={size}
                                        variant="outline"
                                        className={cn(
                                            "rounded-none hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
                                            order.size === size
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-900",
                                        )}
                                        onClick={() =>
                                            setOrder((draft) => {
                                                draft.size = size;
                                            })
                                        }
                                        disabled={
                                            !!order.color &&
                                            !product.colorMap[
                                                order.color
                                            ]?.includes(size)
                                        }
                                    >
                                        {size}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <Link href="#" className="block text-sm underline">
                        Size & Fit Guide
                    </Link>

                    <div className="!mb-0 text-sm text-gray-500">
                        {product.modelInfo}
                    </div>

                    <div className="flex w-full items-end justify-between gap-x-4">
                        <Button size="lg" className="w-2/3 rounded-none">
                            Add to Cart - {formatPrice(product.price)}
                        </Button>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500">Quantity</h3>
                                <div className="mt-1 flex h-10 rounded-none border border-gray-300">
                                    <button
                                        className="flex cursor-pointer items-center justify-center px-4 py-2"
                                        onClick={() =>
                                            setOrder((draft) => {
                                                if (draft.quantity > 1) {
                                                    draft.quantity -= 1;
                                                }
                                            })
                                        }
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <div className="flex w-10 items-center justify-center">
                                        {order.quantity}
                                    </div>
                                    <button
                                        className="flex cursor-pointer items-center justify-center px-4 py-2"
                                        onClick={() =>
                                            setOrder((draft) => {
                                                draft.quantity += 1;
                                            })
                                        }
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <span>Free standard shipping</span>
                        <Link href="#" className="ml-2 underline">
                            Free Returns
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProductDetailsSkeleton = () => {
    return (
        <div className="mx-auto my-24 flex w-full max-w-7xl flex-col gap-8 p-6 md:flex-row">
            <div className="md:w-1/2">
                <ImageCarouselSkeleton />
            </div>

            <div className="md:w-1/2">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-1/2" />

                    <Skeleton className="h-8 w-1/3" />

                    <Skeleton className="h-16 w-full" />
                    <div>
                        <h3 className="mb-2 text-gray-500">Color</h3>
                        <div className="flex space-x-2">
                            <Skeleton className="h-10 w-10 rounded-full border border-gray-300" />
                            <Skeleton className="h-10 w-10 rounded-full border border-gray-300" />
                            <Skeleton className="h-10 w-10 rounded-full border border-gray-300" />
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-gray-500">Size</h3>
                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-10 w-full rounded-md border border-gray-300"
                                />
                            ))}
                        </div>
                    </div>

                    <Link
                        href="#"
                        className="text-muted-foreground block text-sm underline"
                    >
                        Size & Fit Guide
                    </Link>

                    <div className="flex items-end justify-between gap-x-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-10 w-1/3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
