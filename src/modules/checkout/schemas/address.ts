import { z } from "zod";

export const addressSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    apartment: z.string().optional(),
    country: z.string({
        required_error: "Please select a country.",
    }),
    city: z.string({
        required_error: "Please select a city.",
    }),
    zipCode: z.string().min(3, {
        message: "Zipcode must be at least 3 characters.",
    }),
    saveInfo: z.boolean(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
