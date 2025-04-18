export const CHECKOUT_PROCESS = ["address", "shipping", "payment"] as const;

export type ShippingOption = {
    id: string;
    name: string;
    price: number;
    deliveryTime: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
    {
        id: "ups_surepost",
        name: "UPS SurePost",
        price: 9.99,
        deliveryTime: "4-7 Business Days",
    },
    {
        id: "ups_ground",
        name: "UPS Ground Shipping",
        price: 14.99,
        deliveryTime: "3-5 Business Days",
    },
];
