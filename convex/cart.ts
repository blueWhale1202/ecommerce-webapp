import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
    args: {
        sessionId: v.optional(v.string()),
        userId: v.optional(v.id("users")),
        productId: v.id("products"),
        color: v.string(),
        size: v.string(),
        quantity: v.number(),
    },
    handler: async (
        ctx,
        { sessionId, userId, productId, color, size, quantity },
    ) => {
        if (!sessionId && !userId) {
            throw new Error("Either sessionId or userId must be provided");
        }

        const variant = await ctx.db
            .query("productVariants")
            .withIndex("by_product_color_size", (q) =>
                q
                    .eq("productId", productId)
                    .eq("color", color)
                    .eq("size", size),
            )
            .first();

        if (!variant) {
            throw new ConvexError("Variant not found");
        }

        if (quantity > variant.quantity) {
            throw new ConvexError("Quantity exceeds available stock");
        }

        const existing = await ctx.db
            .query("cartItems")
            .filter((q) =>
                userId
                    ? q.eq(q.field("userId"), userId)
                    : q.eq(q.field("sessionId"), sessionId!),
            )
            .filter((q) => q.eq(q.field("variantId"), variant._id))
            .unique();

        if (existing) {
            return await ctx.db.patch(existing._id, {
                quantity: existing.quantity + quantity,
            });
        }

        return await ctx.db.insert("cartItems", {
            userId: userId ?? undefined,
            sessionId: sessionId ?? undefined,
            variantId: variant._id,
            quantity,
            updatedAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        cartItemId: v.id("cartItems"),
        quantity: v.number(),
    },
    handler: async (ctx, { cartItemId, quantity }) => {
        if (quantity <= 0) {
            return await ctx.db.delete(cartItemId);
        }

        return await ctx.db.patch(cartItemId, {
            quantity,
        });
    },
});

export const remove = mutation({
    args: {
        cartItemId: v.id("cartItems"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.cartItemId);
    },
});

export const get = query({
    args: {
        userId: v.optional(v.id("users")),
        sessionId: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        const { userId, sessionId } = args;

        if (!userId && !sessionId) {
            throw new Error("Must provide userId or sessionId.");
        }

        const cartItems = await ctx.db
            .query("cartItems")
            .filter((q) =>
                userId
                    ? q.eq(q.field("userId"), userId)
                    : q.eq(q.field("sessionId"), sessionId!),
            )
            .collect();

        const results = [];

        for (const item of cartItems) {
            const variant = await ctx.db.get(item.variantId);
            if (!variant) continue;

            const product = await ctx.db.get(variant.productId);
            if (!product) continue;

            const image = await ctx.db
                .query("productImages")
                .withIndex("by_product_id", (q) =>
                    q.eq("productId", product._id),
                )
                .order("asc")
                .first();

            results.push({
                productId: product._id,
                slug: product.slug,
                name: product.name,
                size: variant.size,
                color: variant.color,
                quantity: item.quantity,
                price: variant.price ?? product.price,
                image: image?.url ?? null,
                cartItemId: item._id,
                variantId: variant._id,
            });
        }

        const subtotal = results.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );

        return { results, subtotal };
    },
});
