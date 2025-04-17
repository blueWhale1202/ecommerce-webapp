import { ImageCarousel } from "@/components/image-carousel";

export const ProductImages = () => {
    const imageUrls = [
        "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d",
        "https://images.unsplash.com/photo-1554568218-0f1715e72254",
        "https://images.unsplash.com/photo-1604176354204-9268737828e4",
        "https://images.unsplash.com/photo-1576558345433-58e777a5e423",
        "https://images.unsplash.com/photo-1552664199-fd31f7431a55",
        "https://images.unsplash.com/photo-1601925240970-98447486fcdb",
        "https://images.unsplash.com/photo-1524282745852-a463fa495a7f",
        "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e",
        "https://images.unsplash.com/photo-1564477415696-57fe0623c698",
        "https://images.unsplash.com/photo-1524275539700-cf51138f679b",
    ];

    return (
        <div className="md:w-1/2">
            <ImageCarousel imageUrls={imageUrls} />
        </div>
    );
};
