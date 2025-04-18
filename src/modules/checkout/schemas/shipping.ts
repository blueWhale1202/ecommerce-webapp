import { z } from "zod";

export const shippingSchema = z.object({
    shippingMethod: z.enum(["ups_surepost", "ups_ground"], {
        required_error: "Please select a shipping method.",
    }),
});

export type ShippingSchema = z.infer<typeof shippingSchema>;
