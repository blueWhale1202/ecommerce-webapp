type ShippingOption = {
    id: number;
    name: string;
    price: number;
    deliveryTime: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
    {
        id: 1,
        name: "Standard Shipping",
        price: 5.99,
        deliveryTime: "3-5 business days",
    },
    {
        id: 2,
        name: "Express Shipping",
        price: 15.99,
        deliveryTime: "1-2 business days",
    },
    {
        id: 3,
        name: "Next Day Delivery",
        price: 29.99,
        deliveryTime: "Next business day",
    },
];
