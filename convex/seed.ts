import { faker } from "@faker-js/faker";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const categories = [
            "Jackets",
            "Fleece",
            "Sweatshirts & Hoodies",
            "Sweaters",
            "Shirts",
            "T-Shirts",
            "Pants & Jeans",
        ];

        const colors = [
            "#df9167",
            "#7b61ff",
            "#6fcf97",
            "#56ccf2",
            "#eb5757",
            "#4f4f4f",
            "#bb6bd9",
            "#ffffff",
        ];

        const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

        const imageUrls = [
            "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d",
            "https://images.unsplash.com/photo-1554568218-0f1715e72254",
            "https://images.unsplash.com/photo-1604176354204-9268737828e4",
            "https://images.unsplash.com/photo-1576558345433-58e777a5e423",
            "https://images.unsplash.com/photo-1552664199-fd31f7431a55",
            "https://images.unsplash.com/photo-1601925240970-98447486fcdb",
            "https://images.unsplash.com/photo-1524282745852-a463fa495a7f",
            "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e",
            "https://images.unsplash.com/photo-1564477415696-57fe0623c698",
            "https://images.unsplash.com/photo-1524275539700-cf51138f679b",
        ];

        // --- Insert categories ---
        const categoryIds: Id<"categories">[] = [];
        for (const name of categories) {
            const id = await ctx.db.insert("categories", {
                name,
                slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                createdAt: Date.now(),
            });
            categoryIds.push(id);
        }

        // --- Insert products ---
        for (let i = 0; i < 9; i++) {
            const name = faker.commerce.productName();
            const slug =
                name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + `-${i}`;
            const categoryId = faker.helpers.arrayElement(categoryIds);
            const productColors = faker.helpers.arrayElements(colors, 2);
            const productSizes = faker.helpers.arrayElements(sizes, 4);
            const price = Number(
                faker.commerce.price({
                    min: 20,
                    max: 200,
                    dec: 2,
                }),
            );
            const sold = faker.number.int({ min: 0, max: 1000 });

            const productId = await ctx.db.insert("products", {
                name,
                slug,
                description: faker.commerce.productDescription(),
                price,
                sizes: productSizes,
                colors: productColors,
                categoryId,
                modelInfo: "Height: 189 cm / 6'2\", wears size L",
                isPublished: true,
                sold,
                createdAt: Date.now(),
            });

            // --- Insert product variants (color × size) ---
            for (const color of productColors) {
                for (const size of productSizes) {
                    await ctx.db.insert("productVariants", {
                        productId,
                        color,
                        size,
                        sku: `SKU-${slug.slice(0, 6)}-${color.slice(1)}-${size}`,
                        quantity: faker.number.int({ min: 0, max: 500 }),
                        price: undefined,
                        createdAt: Date.now(),
                    });
                }
            }

            // --- Insert product images ---
            const shuffledImages = faker.helpers.shuffle(imageUrls); // randomly shuffle
            for (let j = 0; j < 3; j++) {
                await ctx.db.insert("productImages", {
                    productId,
                    url: shuffledImages[j],
                    alt: `Image ${j + 1} of ${name}`,
                    priority: j,
                });
            }
        }

        // --- Insert coupons ---
        const coupons = [
            { code: "SAVE10", discountPercent: 10 },
            { code: "FREESHIP", discountPercent: 15 },
            { code: "SPRINGSALE", discountPercent: 20 },
        ];

        for (const c of coupons) {
            await ctx.db.insert("coupons", {
                code: c.code,
                discountPercent: c.discountPercent,
                expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
                usageLimit: 100,
                usedCount: 0,
            });
        }

        console.log("✅ Seed completed: 9 products, 3 coupons, categories.");
    },
});
