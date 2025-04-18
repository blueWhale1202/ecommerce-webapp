import { getGuestSessionId } from "@/lib/session";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetCheckout = () => {
    return useQuery(
        convexQuery(api.checkout.get, {
            sessionId: getGuestSessionId(),
        }),
    );
};
