import { z } from "zod";

export const paymentSchema = z.object({
    cardholderName: z.string().min(2, {
        message: "Cardholder name must be at least 2 characters.",
    }),
    cardNumber: z
        .string()
        .min(13, {
            message: "Card number must be at least 13 digits.",
        })
        .max(19, {
            message: "Card number must be at most 19 digits.",
        })
        .refine((val) => /^\d+$/.test(val), {
            message: "Card number must contain only digits.",
        }),
    expiryMonth: z.string({
        required_error: "Expiry month is required.",
    }),
    expiryYear: z.string({
        required_error: "Expiry year is required.",
    }),
    cvc: z
        .string()
        .min(3, {
            message: "CVC must be at least 3 digits.",
        })
        .max(4, {
            message: "CVC must be at most 4 digits.",
        })
        .refine((val) => /^\d+$/.test(val), {
            message: "CVC must contain only digits.",
        }),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
