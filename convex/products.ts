import { asyncMap } from "convex-helpers";
import { filter } from "convex-helpers/server/filter";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
        categories: v.optional(v.array(v.string())),
        colors: v.optional(v.array(v.string())),
        search: v.optional(v.string()),
    },

    handler: async (ctx, { search, categories, colors, paginationOpts }) => {
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
