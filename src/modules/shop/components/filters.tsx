"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Category = {
    id: number;
    name: string;
};

const categories: Category[] = [
    { id: 1, name: "Jackets" },
    { id: 2, name: "Fleece" },
    { id: 3, name: "Sweatshirts & Hoodies" },
    { id: 4, name: "Sweaters" },
    { id: 5, name: "Shirts" },
    { id: 6, name: "T-Shirts" },
    { id: 7, name: "Pants & Jeans" },
];

type Color = {
    value: string;
};

const colors: Color[] = [
    { value: "#df9167" },
    { value: "#7b61ff" },
    { value: "#6fcf97" },
    { value: "#56ccf2" },
    { value: "#eb5757" },
    { value: "#4f4f4f" },
    { value: "#bb6bd9" },
    { value: "#ffffff" },
];

export const FiltersProduct = () => {
    const [filters, setFilters] = useState<string[]>([]);

    const onChange = (value: string) => {
        setFilters((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            }
            return [...prev, value];
        });
    };

    return (
        <div className="w-full shrink-0 md:w-64">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                {filters.length > 0 && (
                    <button
                        className="cursor-pointer text-sm text-gray-400 hover:underline"
                        onClick={() => setFilters([])}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <div className="mb-8">
                <h3 className="mb-3 font-semibold">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                name={category.name}
                                value={category.name}
                                hidden
                                checked={filters.includes(category.name)}
                                onChange={() => onChange(category.name)}
                            />
                            <div className="relative flex size-5 items-center justify-center border-1 border-black">
                                {filters.includes(category.name) && (
                                    <Check className="size-4 text-black" />
                                )}
                            </div>
                            <span>{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-3 font-semibold">Color</h3>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <label
                            key={color.value}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                name={color.value}
                                value={color.value}
                                hidden
                                checked={filters.includes(color.value)}
                                onChange={() => onChange(color.value)}
                            />
                            <div
                                className="relative flex size-8 items-center justify-center rounded-full border border-black"
                                style={{ backgroundColor: color.value }}
                            >
                                {filters.includes(color.value) && (
                                    <Check className="size-4 text-black" />
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
