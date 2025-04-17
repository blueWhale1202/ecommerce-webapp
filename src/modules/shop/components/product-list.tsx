"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useListProducts } from "../apis/list-products";
import { NUM_ITEMS_PER_PAGE } from "../constants";
import { ColorGroup } from "./color-group";
import { SortProduct } from "./sort";

export const ProductList = () => {
    const {
        results: products,
        status,
        loadMore,
        isLoading,
    } = useListProducts();

    if (!isLoading && products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="flex-grow">
            <SortProduct productsCount={products.length} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {status === "LoadingFirstPage" ? (
                    <ProductListSkeleton />
                ) : (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <Link
                                href={`/product/${product.slug}`}
                                className="relative block h-0 w-full pt-[100%]"
                            >
                                <Skeleton className="absolute inset-0 rounded-b-none bg-[#c4c4c4]" />
                                {product.imageUrl && (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        priority
                                        className="absolute inset-0 z-10 object-cover"
                                    />
                                )}
                            </Link>
                            <div className="flex justify-between p-4">
                                <div>
                                    <h3 className="font-bold">
                                        <Link href={`/product/${product.slug}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p>{formatPrice(product.price)}</p>
                                </div>
                                <ColorGroup colors={product.colors} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-10 flex justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    className="rounded-none"
                    disabled={isLoading}
                    onClick={() => loadMore(NUM_ITEMS_PER_PAGE)}
                    hidden={status === "Exhausted"}
                >
                    {isLoading && (
                        <Loader className="text-muted-foreground mr-2 size-4 animate-spin" />
                    )}
                    Load more
                </Button>
            </div>
        </div>
    );
};

export const ProductListSkeleton = () => {
    return Array.from({ length: 6 }).map((_, index) => (
        <div
            key={index}
            className="overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
            <Skeleton className="h-0 w-full rounded-b-none pt-[100%]" />
            <div className="space-y-4 p-4">
                <Skeleton className="mb-2 h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
        </div>
    ));
};
