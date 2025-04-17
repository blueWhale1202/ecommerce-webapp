"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
    imageUrls: string[];
    className?: string;
};

export const ImageCarousel = ({ imageUrls, className }: Props) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const onThumbnailClick = (index: number) => {
        api?.scrollTo(index);
    };

    return (
        <div className={cn("relative w-full", className)}>
            <Carousel
                className="w-full"
                setApi={setApi}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {imageUrls.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
                                <Image
                                    src={image || "/image-placeholder.svg"}
                                    alt={`Product image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 h-10 w-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100" />
                <CarouselNext className="absolute top-1/2 right-4 h-10 w-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100" />
            </Carousel>

            <div className="absolute bottom-28 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {current}/{count}
            </div>

            <div className="relative mt-4">
                <div className="flex items-center justify-center space-x-2 overflow-x-auto px-10 py-2">
                    {imageUrls.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => onThumbnailClick(index)}
                            className={cn(
                                "relative h-16 w-16 overflow-hidden rounded border-2 transition-all",
                                current === index + 1
                                    ? "border-primary"
                                    : "border-transparent",
                            )}
                        >
                            <Image
                                src={image || "/image-placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-0 h-8 w-8 -translate-y-1/2 rounded-full"
                    onClick={() => {
                        const prevIndex =
                            current - 2 >= 0 ? current - 2 : count - 1;
                        api?.scrollTo(prevIndex);
                    }}
                >
                    <ChevronLeft className="size-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-0 h-8 w-8 -translate-y-1/2 rounded-full"
                    onClick={() => {
                        const nextIndex = current % count;
                        api?.scrollTo(nextIndex);
                    }}
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export const ImageCarouselSkeleton = () => {
    return (
        <div className="w-full">
            <Skeleton className="h-[400px] w-full rounded-lg border" />
            <div className="mt-4 flex items-center justify-center space-x-2 overflow-x-auto px-10 py-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-16 w-16 rounded border-2"
                    />
                ))}
            </div>
        </div>
    );
};
