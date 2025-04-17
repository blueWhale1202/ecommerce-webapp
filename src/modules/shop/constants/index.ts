import { SortOptions } from "@/hooks/use-filters";

export type SortOption = {
    label: string;
    value: SortOptions;
};

export const SORT_OPTIONS: SortOption[] = [
    { label: "Popular", value: SortOptions.Popular },
    { label: "Newest", value: SortOptions.Newest },
    { label: "Low to High", value: SortOptions.PriceAsc },
    { label: "High to Low", value: SortOptions.PriceDesc },
];

export type Color = {
    value: string;
};

export const COLORS: Color[] = [
    { value: "#df9167" },
    { value: "#7b61ff" },
    { value: "#6fcf97" },
    { value: "#56ccf2" },
    { value: "#eb5757" },
    { value: "#4f4f4f" },
    { value: "#bb6bd9" },
    { value: "#ffffff" },
];

export const NUM_ITEMS_PER_PAGE = 6;
