import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { SortProduct } from "./sort";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    size: string;
};

// size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
const products: Product[] = [
    {
        id: 1,
        name: "Basic Tee",
        price: 199000,
        imageUrl: "https://source.unsplash.com/random/300x300?shirt",
        size: "M",
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 499000,
        imageUrl: "https://source.unsplash.com/random/300x300?jacket",
        size: "L",
    },
    {
        id: 3,
        name: "Sport Shorts",
        price: 249000,
        imageUrl: "https://source.unsplash.com/random/300x300?shorts",
        size: "S",
    },
    {
        id: 4,
        name: "Hoodie Classic",
        price: 399000,
        imageUrl: "https://source.unsplash.com/random/300x300?hoodie",
        size: "XL",
    },
    {
        id: 5,
        name: "Striped Polo",
        price: 279000,
        imageUrl: "https://source.unsplash.com/random/300x300?polo",
        size: "M",
    },
    {
        id: 6,
        name: "Slim Fit Jeans",
        price: 459000,
        imageUrl: "https://source.unsplash.com/random/300x300?jeans",
        size: "L",
    },
    {
        id: 7,
        name: "Cotton Shirt",
        price: 229000,
        imageUrl: "https://source.unsplash.com/random/300x300?shirt+cotton",
        size: "XS",
    },
    {
        id: 8,
        name: "Running Tee",
        price: 189000,
        imageUrl: "https://source.unsplash.com/random/300x300?running+shirt",
        size: "M",
    },
    {
        id: 9,
        name: "Puffer Vest",
        price: 349000,
        imageUrl: "https://source.unsplash.com/random/300x300?vest",
        size: "XXL",
    },
];

export const ProductList = () => {
    return (
        <div className="flex-grow">
            <SortProduct />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                        <Link href={`/product/${product.id}`}>
                            <Skeleton className="aspect-square rounded-b-none bg-[#c4c4c4]" />
                        </Link>
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold">
                                    <Link href={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p>{formatPrice(product.price)}</p>
                            </div>
                            <span className="text-gray-500">
                                {product.size}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Button variant="outline" size="lg" className="rounded-none">
                    Load more products
                </Button>
            </div>
        </div>
    );
};
