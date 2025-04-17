import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";

export enum SortOptions {
    PriceAsc = "price-asc",
    PriceDesc = "price-desc",
    Newest = "newest",
    Popular = "popular",
}

export const useFilters = () => {
    return useQueryStates({
        categories: parseAsArrayOf(parseAsString).withDefault([]),
        colors: parseAsArrayOf(parseAsString).withDefault([]),
        search: parseAsString.withDefault(""),
        sort: parseAsStringEnum<SortOptions>(
            Object.values(SortOptions),
        ).withDefault(SortOptions.Newest),
    });
};
