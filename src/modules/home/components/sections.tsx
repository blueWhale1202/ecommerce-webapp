import { Button } from "@/components/ui/button";
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
                        className="mb-10 w-40 rounded-md shadow"
                    >
                        <Link href="/shop">Shop All</Link>
                    </Button>
                    <div className="mx-auto mb-8 aspect-[16/9] w-full max-w-5xl">
                        <Image
                            src="/images/hero-2.jpg"
                            alt="Better clothing for the planet"
                            width={1920}
                            height={512}
                            className="size-full"
                        />
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
                                    className="mx-2 size-auto rounded-md object-contain shadow transition-all duration-300 ease-in-out hover:scale-105"
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
                        className="mb-36 w-40 rounded-md shadow"
                    >
                        <Link href="/shop">Shop All</Link>
                    </Button>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                        <Image
                            src={"/images/hero-4.jpg"}
                            alt="Our latest arrivals"
                            width={368}
                            height={521}
                            className="h-[521px] flex-1 rounded-md object-cover shadow transition-all duration-300 ease-in-out hover:scale-105"
                        />
                        <Image
                            src={"/images/hero-1.jpg"}
                            alt="Our latest arrivals"
                            width={368}
                            height={521}
                            className="h-[521px] flex-1 -translate-y-20 rounded-md object-cover shadow transition-all duration-300 ease-in-out hover:scale-105"
                        />

                        <Image
                            src={"/images/hero-3.jpg"}
                            alt="Our latest arrivals"
                            width={368}
                            height={521}
                            className="h-[521px] flex-1 rounded-md object-cover shadow transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
