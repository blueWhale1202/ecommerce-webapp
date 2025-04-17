import { ProductImages } from "@/modules/product/components/product-images";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import Link from "next/link";

type Product = {
    id: string;
    name: string;
    isLiked: boolean;
    price: number;
    description: string;
    color: string[];
    size: string[];
    quantity: number;
    images: string[];
    modelInfo?: string;
};

const product: Product = {
    id: "1",
    name: "Men's winter jacket",
    isLiked: false,
    price: 99,
    description:
        "Revamp your style with the latest designer trends in men's clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.",
    color: ["#df9167", "#000000"],
    size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    quantity: 2,
    images: [
        "https://images.unsplash.com/photo-1612839214222-4d5e6f5b8c3b",
        "https://images.unsplash.com/photo-1612839214222-4d5e6f5b8c3b",
        "https://images.unsplash.com/photo-1612839214222-4d5e6f5b8c3b",
        "https://images.unsplash.com/photo-1612839214222-4d5e6f5b8c3b",
    ],
    modelInfo: "Height of model: 189 cm. / 6' 2\" Size 41",
};

type Props = {
    params: Promise<{ productId: string }>;
};

export default async function ProductIdPage({ params }: Props) {
    const { productId } = await params;
    return (
        <div className="mx-auto mt-24 flex max-w-7xl flex-col gap-8 p-6 md:flex-row">
            <ProductImages />

            {/* Product Info */}
            <div className="md:w-1/2">
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">
                            Men's winter jacket
                        </h1>
                        <div className="flex space-x-2">
                            <button>
                                <Heart className="h-6 w-6" />
                            </button>
                            <button>
                                <Share2 className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <p className="text-2xl font-bold">$99</p>

                    <p className="text-gray-700">
                        Revamp your style with the latest designer trends in
                        men's clothing or achieve a perfectly curated wardrobe
                        thanks to our line-up of timeless pieces.
                    </p>

                    <div>
                        <h3 className="mb-2 text-gray-500">Color</h3>
                        <div className="flex space-x-2">
                            <div className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-300 bg-[#df9167]"></div>
                            <div className="h-10 w-10 cursor-pointer rounded-full bg-black"></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-gray-500">Size</h3>
                        <div className="grid grid-cols-7 gap-2">
                            {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map(
                                (size) => (
                                    <button
                                        key={size}
                                        className={`rounded-md border border-gray-300 px-3 py-2 ${size === "M" ? "bg-gray-100" : ""}`}
                                    >
                                        {size}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>

                    <div>
                        <Link href="#" className="text-sm underline">
                            Size & Fit Guide
                        </Link>
                    </div>

                    <div className="text-sm text-gray-500">
                        Height of model: 189 cm. / 6' 2" Size 41
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500">Quantity</h3>
                            <div className="mt-1 flex rounded-md border border-gray-300">
                                <button className="flex items-center justify-center px-4 py-2">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <div className="flex w-10 items-center justify-center">
                                    2
                                </div>
                                <button className="flex items-center justify-center px-4 py-2">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-black px-6 py-3 text-white">
                        Add to Cart - $250
                    </button>

                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Free standard shipping</span>
                        <Link href="#" className="underline">
                            Free Returns
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
