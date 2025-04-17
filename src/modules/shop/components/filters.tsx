"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/hooks/use-filters";
import { Check } from "lucide-react";
import { useListCategories } from "../apis/list-categries";
import { COLORS } from "../constants";

type FilterKey = "categories" | "colors";

export const FiltersProduct = () => {
    const [filters, setFilters] = useFilters();

    const { data: categories, error, isPending } = useListCategories();

    const onChange = (key: FilterKey, value: string) => {
        const isChecked = filters[key].includes(value);
        const newFilters = isChecked
            ? filters[key].filter((item) => item !== value)
            : [...filters[key], value];

        setFilters((prev) => ({
            ...prev,
            [key]: newFilters,
        }));
    };

    if (error) {
        return <div>Error loading categories</div>;
    }

    if (!isPending && categories.length === 0) {
        return <div>No categories available</div>;
    }

    return (
        <div className="w-full shrink-0 md:w-64">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                {(filters.categories.length > 0 ||
                    filters.colors.length > 0) && (
                    <button
                        className="cursor-pointer text-sm text-gray-400 hover:underline"
                        onClick={() => setFilters(null)}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <div className="mb-8">
                <h3 className="mb-3 font-semibold">Categories</h3>
                <div className="space-y-2">
                    {isPending ? (
                        <CategoriesSkeleton />
                    ) : (
                        categories.map((category) => (
                            <label
                                key={category._id}
                                className="flex cursor-pointer items-center gap-3"
                            >
                                <input
                                    type="checkbox"
                                    name={category.name}
                                    value={category._id}
                                    hidden
                                    checked={filters.categories.includes(
                                        category._id,
                                    )}
                                    onChange={() =>
                                        onChange("categories", category._id)
                                    }
                                />
                                <div className="relative flex size-5 items-center justify-center border-1 border-black">
                                    {filters.categories.includes(
                                        category._id,
                                    ) && (
                                        <Check className="size-4 text-black" />
                                    )}
                                </div>
                                <span>{category.name}</span>
                            </label>
                        ))
                    )}
                </div>
            </div>

            <div>
                <h3 className="mb-3 font-semibold">Color</h3>
                <div className="flex flex-wrap gap-2">
                    {COLORS.map((color) => (
                        <label
                            key={color.value}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                name={color.value}
                                value={color.value}
                                hidden
                                checked={filters.categories.includes(
                                    color.value.slice(1),
                                )}
                                onChange={() =>
                                    onChange("colors", color.value.slice(1))
                                }
                            />
                            <div
                                className="relative flex size-8 items-center justify-center rounded-full border border-black"
                                style={{ backgroundColor: color.value }}
                            >
                                {filters.colors.includes(
                                    color.value.slice(1),
                                ) && <Check className="size-4 text-black" />}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const CategoriesSkeleton = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="mb-2 h-7 w-full rounded-md" />
            ))}
        </>
    );
};
