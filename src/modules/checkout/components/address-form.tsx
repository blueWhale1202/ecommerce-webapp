"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormCombobox } from "@/components/form-combobox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getGuestSessionId } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetCheckout } from "../apis/get";
import { useGetCountries } from "../apis/get-country";
import { useUpdateDraftAddress } from "../apis/update-address";
import { addressSchema, AddressSchema } from "../schemas/address";

export const AddressForm = () => {
    const form = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            country: "",
            city: "",
            zipCode: "",
            saveInfo: false,
        },
    });

    const { isPending, data } = useGetCheckout();

    useEffect(() => {
        if (isPending || !data) return;

        form.reset(data);
    }, [isPending, data, form]);

    const { cityMap, countries } = useGetCountries();
    const update = useUpdateDraftAddress();

    const router = useRouter();

    const onSubmit = (data: AddressSchema) => {
        const { saveInfo, ...rest } = data;
        update.mutate(
            {
                ...rest,
                sessionId: getGuestSessionId(),
            },
            {
                onError(error) {
                    console.error("Error updating address:", error);
                    toast.error("Error updating address. Please try again.");
                },
                onSuccess() {
                    router.push("/checkout/shipping");
                },
            },
        );
    };

    return (
        <div className="lg:w-2/3">
            <h2 className="mb-6 text-xl font-medium">Shipping Information</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Apartment, suite, etc (optional)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormCombobox
                            name="country"
                            label="Country"
                            placeholder="Select a country"
                            options={countries}
                            searchPlaceholder="Search for a country..."
                            emptyMessage="No countries found."
                        />

                        <FormCombobox
                            name="city"
                            label="City"
                            placeholder="Select a city"
                            options={cityMap[form.watch("country")] || []}
                            searchPlaceholder="Search for a city..."
                            emptyMessage="No cities found."
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Zipcode" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="saveInfo"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-y-0 space-x-1 py-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Save contact information
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-black text-white"
                        disabled={update.isPending}
                    >
                        Continue to shipping
                    </Button>
                </form>
            </Form>
        </div>
    );
};
