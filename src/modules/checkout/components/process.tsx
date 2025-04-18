"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHECKOUT_PROCESS } from "../constants";

export const CheckoutProcess = () => {
    const pathname = usePathname();
    return (
        <div className="mb-8 flex items-center">
            {CHECKOUT_PROCESS.map((step, index) => {
                const isActive = pathname.includes(step);
                const isLastStep = index === CHECKOUT_PROCESS.length - 1;

                return (
                    <div key={step} className="flex items-center">
                        <Link
                            href={`/checkout/${step}`}
                            className={cn(
                                "text-muted-foreground hover:text-primary capitalize hover:underline",
                                isActive && "text-primary font-semibold",
                            )}
                        >
                            {step}
                        </Link>
                        {!isLastStep && (
                            <div className="mx-4 h-px w-16 bg-gray-300" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
