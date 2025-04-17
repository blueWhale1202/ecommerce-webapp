"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SORT_OPTIONS } from "../constants";

type Props = {
    productsCount: number;
};

export const SortProduct = ({ productsCount }: Props) => {
    const [sort, setSort] = useState<string>("popular");

    return (
        <div className="mb-6 flex flex-col items-end justify-end gap-y-2">
            <div className="mb-4 flex items-center sm:mb-0">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center rounded border border-gray-300 bg-white px-3 py-2 text-sm">
                        <span className="mr-2 text-gray-500">Sort By</span>
                        <span className="mr-1 font-medium capitalize">
                            {sort}
                        </span>
                        <ChevronDown className="text-muted-foreground size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        {SORT_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => setSort(option.value)}
                            >
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-sm text-gray-600">
                Showing {productsCount} Products
            </p>
        </div>
    );
};
