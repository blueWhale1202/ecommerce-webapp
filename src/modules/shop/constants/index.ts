export type SortOption = {
    label: string;
    value: string;
};

export const SORT_OPTIONS: SortOption[] = [
    { label: "Popular", value: "popular" },
    { label: "Newest", value: "newest" },
    { label: "Low to High", value: "price_low_to_high" },
    { label: "High to Low", value: "price_high_to_low" },
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
