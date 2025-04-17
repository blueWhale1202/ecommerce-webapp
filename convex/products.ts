import { asyncMap } from "convex-helpers";
import { filter } from "convex-helpers/server/filter";
import { getManyFrom } from "convex-helpers/server/relationships";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
        categories: v.optional(v.array(v.string())),
        colors: v.optional(v.array(v.string())),
        search: v.optional(v.string()),
        sort: v.optional(
            v.union(
                v.literal("price-asc"),
                v.literal("price-desc"),
                v.literal("newest"),
                v.literal("popular"),
            ),
        ),
    },

    handler: async (
        ctx,
        { search, categories, colors, sort, paginationOpts },
    ) => {
        const products = await filter(
            ctx.db.query("products").withIndex("by_name_category_color"),
            (product) => {
                let isInCategory = true;
                let isInColor = true;

                if (search) {
                    const isMatching = product.name
                        .toLowerCase()
                        .includes(search.toLowerCase());

                    if (!isMatching) {
                        return false;
                    }
                }

                if (categories && categories.length > 0) {
                    isInCategory = categories.includes(product.categoryId);
                }

                if (colors && colors.length > 0) {
                    isInColor = colors.some((color) =>
                        product.colors.includes(`#${color}`),
                    );
                }

                return isInCategory && isInColor;
            },
        ).paginate(paginationOpts);

        if (sort) {
            products.page.sort((a, b) => {
                switch (sort) {
                    case "price-asc":
                        return a.price - b.price;
                    case "price-desc":
                        return b.price - a.price;
                    case "newest":
                        return a._creationTime - b._creationTime;
                    case "popular":
                        return (b.sold || 0) - (a.sold || 0);
                    default:
                        return 0;
                }
            });
        }

        const productImages = await asyncMap(products.page, async (product) => {
            const imageUrl = await ctx.db
                .query("productImages")
                .withIndex("by_product_id", (q) =>
                    q.eq("productId", product._id),
                )
                .first();

            return imageUrl?.url;
        });

        return {
            ...products,
            page: products.page.map((product, index) => {
                return {
                    ...product,
                    imageUrl: productImages[index],
                };
            }),
        };
    },
});

export const get = query({
    args: { slug: v.string() },
    handler: async (ctx, { slug }) => {
        const product = await ctx.db
            .query("products")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first();

        if (!product) {
            throw new ConvexError("Product not found");
        }

        const [imageUrls, productVariants] = await Promise.all([
            getManyFrom(
                ctx.db,
                "productImages",
                "by_product_id",
                product._id,
                "productId",
            ),
            getManyFrom(
                ctx.db,
                "productVariants",
                "by_product_id",
                product._id,
                "productId",
            ),
        ]);

        const sizeMap: Record<string, Set<string>> = {};
        const colorMap: Record<string, Set<string>> = {};

        for (const v of productVariants) {
            if (v.quantity > 0) {
                if (!sizeMap[v.size]) {
                    sizeMap[v.size] = new Set();
                }
                sizeMap[v.size].add(v.color);

                if (!colorMap[v.color]) {
                    colorMap[v.color] = new Set();
                }
                colorMap[v.color].add(v.size);
            }
        }

        return {
            ...product,
            imageUrls: imageUrls.map((image) => image.url),
            sizeMap: mapNormalize(sizeMap),
            colorMap: mapNormalize(colorMap),
        };
    },
});

export function mapNormalize(map: Record<string, Set<string>>) {
    return Object.entries(map).reduce(
        (acc, [key, values]) => ({
            ...acc,
            [key]: Array.from(values),
        }),
        {},
    );
}
