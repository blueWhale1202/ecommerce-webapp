import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

export const useFilters = () => {
    return useQueryStates({
        categories: parseAsArrayOf(parseAsString).withDefault([]),
        colors: parseAsArrayOf(parseAsString).withDefault([]),
        search: parseAsString.withDefault(""),
    });
};
