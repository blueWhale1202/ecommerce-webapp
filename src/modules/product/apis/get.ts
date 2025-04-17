import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetProduct = (slug: string) => {
    return useQuery(convexQuery(api.products.get, { slug }));
};
