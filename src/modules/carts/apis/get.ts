import { getGuestSessionId } from "@/lib/session";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetCart = () => {
    return useQuery(
        convexQuery(api.cart.get, {
            sessionId: getGuestSessionId(),
        }),
    );
};
