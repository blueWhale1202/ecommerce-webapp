import { ProductDetails } from "@/modules/product/components/product-details";

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
    params: Promise<{ slug: string }>;
};

export default async function ProductIdPage({ params }: Props) {
    const { slug } = await params;

    return <ProductDetails slug={slug} />;
}
