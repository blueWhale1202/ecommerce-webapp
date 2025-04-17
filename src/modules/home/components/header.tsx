"use client";

import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { NAVIGATION } from "../constants";
import { CartCount } from "./cart-count";
import { SearchProduct } from "./search-product";

type Props = {
    variant?: "light" | "dark";
};

export const Header = ({ variant = "light" }: Props) => {
    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b border-gray-200 bg-[#EFF2F6] px-6 py-4",
                variant === "dark" && "border-gray-600 bg-[#0D0D0D] text-white",
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-xl font-bold outline-none">
                        Ecommerce
                    </Link>
                    <nav className="hidden gap-x-6 md:flex">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "hover:text-gray-600 hover:underline",
                                    variant === "dark" &&
                                        "text-white hover:text-gray-300",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center space-x-6">
                    <SearchProduct />
                    <div className="flex items-center">
                        <Link href="/cart" className="relative">
                            <ShoppingBag className="size-5" />
                            <CartCount variant={variant} />
                        </Link>
                    </div>
                    <Link
                        href="/login"
                        className="hover:text-gray-600 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
};
