import { Input } from "@/components/ui/input";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { NAVIGATION } from "../constants";

type Props = {
    variant?: "light" | "dark";
};

export const Header = ({ variant = "dark" }: Props) => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#EFF2F6] px-6 py-4">
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
                                className="hover:text-gray-600 hover:underline"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="relative flex items-center">
                        <Search className="text-muted-foreground absolute left-3 size-5" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="bg-white py-1 pr-4 pl-10"
                        />
                    </div>
                    <div className="flex items-center">
                        <Link href="/checkout" className="relative">
                            <ShoppingBag className="size-5" />
                            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-black text-xs text-white">
                                {/* Update with real data */}3
                            </span>
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
