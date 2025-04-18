"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getGuestSessionId } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetCheckout } from "../apis/get";
import { useUpdateDraftShipping } from "../apis/update-shipping";
import { SHIPPING_OPTIONS } from "../constants";
import { ShippingSchema, shippingSchema } from "../schemas/shipping";

export const ShippingForm = () => {
    const form = useForm<ShippingSchema>({
        resolver: zodResolver(shippingSchema),
    });

    const { isPending, data } = useGetCheckout();

    useEffect(() => {
        if (isPending || !data) return;

        form.reset({
            shippingMethod: "ups_surepost",
        });
    }, [isPending, data, form]);

    const router = useRouter();
    const update = useUpdateDraftShipping();

    const onSubmit = (data: ShippingSchema) => {
        update.mutate(
            {
                sessionId: getGuestSessionId(),
                shippingMethod: data.shippingMethod,
            },
            {
                onError: (error) => {
                    console.error("Error updating shipping method:", error);
                    toast.error(
                        "Error updating shipping method. Please try again.",
                    );
                },
                onSuccess: () => {
                    router.push("/checkout/payment");
                },
            },
        );
    };

    return (
        <div className="lg:w-2/3">
            <h2 className="mb-6 text-xl font-medium">Shipping Method</h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="shippingMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                        className="flex flex-col space-y-3"
                                    >
                                        {SHIPPING_OPTIONS.map((option) => (
                                            <div
                                                key={option.id}
                                                className={cn(
                                                    "flex items-start space-x-3 rounded-md border border-gray-200 p-4",
                                                    field.value === option.id
                                                        ? "border-black bg-gray-50"
                                                        : "hover:border-gray-300",
                                                )}
                                            >
                                                <FormItem className="flex items-center space-y-0 space-x-1">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={option.id}
                                                        />
                                                    </FormControl>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex justify-between">
                                                            <FormLabel className="cursor-pointer font-medium">
                                                                {option.name}
                                                            </FormLabel>
                                                        </div>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                option.deliveryTime
                                                            }
                                                        </p>
                                                    </div>
                                                </FormItem>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isPending}
                    >
                        Continue to payment
                    </Button>
                </form>
            </Form>
        </div>
    );
};
