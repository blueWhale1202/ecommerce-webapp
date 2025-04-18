"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { generateMonths, generateYears } from "../lib/utils";
import { paymentSchema, PaymentSchema } from "../schemas/payment";

export const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState<
        "card" | "paypal" | "applepay"
    >("card");

    const form = useForm<PaymentSchema>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            cvc: "",
        },
    });

    const onSubmit = (data: PaymentSchema) => {
        console.log("Payment data:", data);
    };

    const months = generateMonths();
    const years = generateYears();

    return (
        <div className="lg:w-2/3">
            <div className="mb-6 flex items-center">
                <Link
                    href="/checkout/shipping"
                    className="flex items-center text-sm text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Return to shipping
                </Link>
            </div>

            <div className="mb-8 flex gap-4">
                <button
                    className={cn(
                        "flex w-1/2 items-center justify-center rounded border",
                        paymentMethod === "paypal"
                            ? "border-black"
                            : "border-gray-300",
                    )}
                    onClick={() => setPaymentMethod("paypal")}
                >
                    <Icons.paypal className="size-20" />
                </button>
                <button
                    className={cn(
                        "flex w-1/2 items-center justify-center rounded px-6 py-3",
                        paymentMethod === "applepay"
                            ? "bg-black text-white"
                            : "bg-black text-white opacity-80 hover:opacity-100",
                    )}
                    onClick={() => setPaymentMethod("applepay")}
                >
                    <Icons.apple className="size-12" />
                </button>
            </div>

            <h2 className="mb-4 text-xl font-medium">Payment Details</h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="cardholderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Cardholder Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Card Number"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 19);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <FormField
                                control={form.control}
                                name="expiryMonth"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {months.map((month) => (
                                                    <SelectItem
                                                        key={month.value}
                                                        value={month.value}
                                                    >
                                                        {month.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="expiryYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {years.map((year) => (
                                                    <SelectItem
                                                        key={year.value}
                                                        value={year.value}
                                                    >
                                                        {year.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="cvc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="CVC"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 4);
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white"
                    >
                        Pay with card
                    </Button>
                </form>
            </Form>
        </div>
    );
};
