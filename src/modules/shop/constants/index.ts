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
