import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "../constants";

export const Sections = () => {
    return (
        <>
            <section className="bg-[#EFF2F6] py-16">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="mb-5 text-5xl font-semibold">
                        Better clothing for the planet
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Create screens directly in Method or add your images
                        from Sketch or Figma. <br /> You can even sync designs
                        from your cloud storage!
                    </p>
                    <Button
                        asChild
                        variant="outline-link"
                        size="lg"
                        className="mb-10 w-40 rounded-none"
                    >
                        <Link href="/shop">Shop All</Link>
                    </Button>
                    <div className="mx-auto mb-8 aspect-[16/9] w-full max-w-5xl">
                        <Skeleton className="size-full bg-[#c4c4c4]" />
                    </div>
                    <div className="flex h-16 items-center justify-center space-x-14">
                        {BRANDS.map((brand) => (
                            <Link
                                href={brand.href}
                                key={brand.href}
                                className="flex h-full items-center justify-center"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={200}
                                    height={50}
                                    className="mx-2 size-auto rounded-none object-contain transition-all duration-300 ease-in-out hover:scale-105"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#EFF2F6] py-16">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="mb-4 text-5xl font-bold">
                        Our latest arrivals
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Create screens directly in Method or add your images
                        from Sketch or Figma. <br />
                        You can even sync designs from your cloud storage!
                    </p>
                    <Button
                        asChild
                        variant="outline-link"
                        size="lg"
                        className="mb-36 w-40 rounded-none"
                    >
                        <Link href="/shop">Shop All</Link>
                    </Button>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                        <Skeleton className="h-[521px] flex-1 bg-[#c4c4c4]" />
                        <Skeleton className="h-[521px] flex-1 -translate-y-20 bg-[#c4c4c4]" />
                        <Skeleton className="h-[521px] flex-1 bg-[#c4c4c4]" />
                    </div>
                </div>
            </section>
        </>
    );
};
