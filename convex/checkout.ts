import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateAddress = mutation({
    args: {
        sessionId: v.string(),
        userId: v.optional(v.id("users")),
        firstName: v.string(),
        lastName: v.string(),
        address: v.string(),
        apartment: v.optional(v.string()),
        city: v.string(),
        country: v.string(),
        zipCode: v.string(),
    },
    handler: async (ctx, args) => {
        const { sessionId, userId, ...rest } = args;

        const existingSession = await ctx.db
            .query("checkoutSessions")
            .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
            .unique();

        const now = Date.now();

        if (existingSession) {
            return await ctx.db.patch(existingSession._id, {
                userId: userId ?? existingSession.userId,
                ...rest,
                updatedAt: now,
            });
        }

        return await ctx.db.insert("checkoutSessions", {
            sessionId,
            userId: userId ?? undefined,
            ...rest,
            updatedAt: now,
        });
    },
});

export const updateShipping = mutation({
    args: {
        sessionId: v.string(),
        shippingMethod: v.union(
            v.literal("ups_surepost"),
            v.literal("ups_ground"),
        ),
    },
    handler: async (ctx, { sessionId, shippingMethod }) => {
        const existingSession = await ctx.db
            .query("checkoutSessions")
            .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
            .unique();

        if (!existingSession) {
            throw new Error("Checkout session not found.");
        }

        return await ctx.db.patch(existingSession._id, {
            shippingMethod,
            updatedAt: Date.now(),
        });
    },
});

export const updatePayment = mutation({
    args: {
        sessionId: v.string(),
        paymentMethod: v.union(
            v.literal("card"),
            v.literal("paypal"),
            v.literal("apple_pay"),
        ),
    },
    handler: async (ctx, { sessionId, paymentMethod }) => {
        const existingSession = await ctx.db
            .query("checkoutSessions")
            .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
            .unique();

        if (!existingSession) {
            throw new Error("Checkout session not found.");
        }

        return await ctx.db.patch(existingSession._id, {
            paymentMethod,
            updatedAt: Date.now(),
        });
    },
});

export const get = query({
    args: {
        sessionId: v.string(),
    },
    handler: async (ctx, { sessionId }) => {
        const session = await ctx.db
            .query("checkoutSessions")
            .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
            .unique();

        if (!session) {
            throw new Error("Checkout session not found.");
        }

        return session;
    },
});
