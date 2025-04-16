type Navigation = {
    label: string;
    href: string;
};

export const NAVIGATION: Navigation[] = [
    { label: "Shop", href: "/shop" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
];

type Brand = {
    name: string;
    logo: string;
    href: string;
};

export const BRANDS: Brand[] = [
    {
        name: "The New York Times",
        logo: "/images/brands/nytimes.png",
        href: "https://www.nytimes.com/",
    },
    {
        name: "VOGUE",
        logo: "/images/brands/vogue.png",
        href: "https://www.vogue.com/",
    },
    {
        name: "VANITY FAIR",
        logo: "/images/brands/vanityfair.png",
        href: "https://www.vanityfair.com/",
    },
    {
        name: "CNBC",
        logo: "/images/brands/cnbc.png",
        href: "https://www.cnbc.com/",
    },
];

// Shop

// Women's
// Men's
// Kids'

// Shoes

// Equipment
// By Activity
// Gift Cards
// Sale

// Help

// Help Center
// Order Status
// Size Chart
// Returns & Warranty
// Contact Us

// About

// About Us

// Responsibility
// Technology & Innovation
// Explore our stories

type FooterLink = {
    label: string;
    items: Navigation[];
};

export const FOOTER_LINKS: FooterLink[] = [
    {
        label: "Shop",
        items: [
            { label: "Women's", href: "/shop/womens" },
            { label: "Men's", href: "/shop/mens" },
            { label: "Kids'", href: "/shop/kids" },
            { label: "Shoes", href: "/shop/shoes" },
            { label: "Equipment", href: "/shop/equipment" },
            { label: "By Activity", href: "/shop/by-activity" },
            { label: "Gift Cards", href: "/shop/gift-cards" },
            { label: "Sale", href: "/shop/sale" },
        ],
    },
    {
        label: "Help",
        items: [
            { label: "Help Center", href: "/help" },
            { label: "Order Status", href: "/help/order-status" },
            { label: "Size Chart", href: "/help/size-chart" },
            { label: "Returns & Warranty", href: "/help/returns-warranty" },
            { label: "Contact Us", href: "/help/contact-us" },
        ],
    },
    {
        label: "About",
        items: [
            { label: "About Us", href: "/about" },
            { label: "Responsibility", href: "/about/responsibility" },
            { label: "Technology & Innovation", href: "/about/technology" },
            { label: "Explore our stories", href: "/about/stories" },
        ],
    },
];
