import { useFilters } from "@/hooks/use-filters";
import { usePaginatedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { NUM_ITEMS_PER_PAGE } from "../constants";

export const useListProducts = () => {
    const [{ categories, colors, search, sort }] = useFilters();

    const { status, isLoading, results, loadMore } = usePaginatedQuery(
        api.products.list,
        { categories, colors, search, sort },
        { initialNumItems: NUM_ITEMS_PER_PAGE },
    );

    useEffect(() => {
        if (isLoading) return;

        const missingItems = NUM_ITEMS_PER_PAGE - results.length;

        if (status !== "Exhausted" && missingItems > 0) {
            loadMore(missingItems);
        }
    }, [status, results.length, isLoading, loadMore]);

    return {
        status,
        isLoading,
        results,
        loadMore,
    };
};
