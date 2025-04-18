import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        avatarUrl: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
        updatedAt: v.number(),
    }).index("by_clerkId", ["clerkId"]),

    addresses: defineTable({
        userId: v.id("users"),
        fullName: v.string(),
        addressLine1: v.string(),
        addressLine2: v.optional(v.string()),
        city: v.string(),
        country: v.string(),
        zipCode: v.string(),
        isDefault: v.boolean(),
        updatedAt: v.number(),
    }).index("by_user_id", ["userId"]),

    categories: defineTable({
        name: v.string(),
        slug: v.string(),
        updatedAt: v.number(),
    }).index("by_slug", ["slug"]),

    products: defineTable({
        name: v.string(),
        slug: v.string(),
        description: v.string(),
        price: v.number(),
        sizes: v.array(v.string()),
        colors: v.array(v.string()),
        categoryId: v.id("categories"),
        modelInfo: v.optional(v.string()),
        isPublished: v.boolean(),
        sold: v.optional(v.number()),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_name", ["name"])
        .index("by_category_id", ["categoryId"])
        .index("by_category_color", ["categoryId", "colors"])
        .index("by_name_category_color", ["name", "categoryId", "colors"])
        .index("by_price", ["price"])
        .index("by_updatedAt", ["updatedAt"])
        .index("by_sold", ["sold"]),

    productImages: defineTable({
        productId: v.id("products"),
        url: v.string(),
        alt: v.optional(v.string()),
        priority: v.number(),
    }).index("by_product_id", ["productId"]),

    productVariants: defineTable({
        productId: v.id("products"),
        color: v.string(),
        size: v.string(),
        sku: v.string(),
        quantity: v.number(),
        price: v.optional(v.number()),
        updatedAt: v.number(),
    })
        .index("by_product_id", ["productId"])
        .index("by_product_color_size", ["productId", "color", "size"]),

    cartItems: defineTable({
        userId: v.optional(v.id("users")),
        sessionId: v.optional(v.string()),
        variantId: v.id("productVariants"),
        quantity: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user_id", ["userId"])
        .index("by_session_id", ["sessionId"]),

    checkoutSessions: defineTable({
        sessionId: v.string(),
        userId: v.optional(v.id("users")),

        firstName: v.string(),
        lastName: v.string(),
        address: v.string(),
        apartment: v.optional(v.string()),
        city: v.optional(v.string()),
        country: v.optional(v.string()),
        zipCode: v.optional(v.string()),

        shippingMethod: v.optional(
            v.union(v.literal("ups_surepost"), v.literal("ups_ground")),
        ),

        paymentMethod: v.optional(
            v.union(
                v.literal("card"),
                v.literal("paypal"),
                v.literal("apple_pay"),
            ),
        ),

        updatedAt: v.number(),
    }).index("by_session_id", ["sessionId"]),

    orders: defineTable({
        userId: v.optional(v.id("users")),
        sessionId: v.optional(v.string()),
        totalAmount: v.number(),
        status: v.union(
            v.literal("pending"),
            v.literal("paid"),
            v.literal("cancelled"),
        ),
        addressId: v.id("addresses"),
        shippingMethod: v.union(
            v.literal("ups_surepost"),
            v.literal("ups_ground"),
        ),
        paymentMethod: v.union(
            v.literal("card"),
            v.literal("paypal"),
            v.literal("apple_pay"),
        ),
        updatedAt: v.number(),
    })
        .index("by_user_id", ["userId"])
        .index("by_session_id", ["sessionId"]),

    orderItems: defineTable({
        orderId: v.id("orders"),
        variantId: v.id("productVariants"),
        nameSnapshot: v.string(),
        priceSnapshot: v.number(),
        size: v.string(),
        color: v.string(),
        quantity: v.number(),
    }).index("by_order_id", ["orderId"]),

    reviews: defineTable({
        productId: v.id("products"),
        userId: v.id("users"),
        title: v.string(),
        description: v.string(),
        rating: v.number(),
        updatedAt: v.number(),
    }).index("by_product_id", ["productId"]),

    reviewVotes: defineTable({
        reviewId: v.id("reviews"),
        userId: v.id("users"),
        vote: v.union(v.literal("yes"), v.literal("no")),
    }).index("by_review_id", ["reviewId"]),

    wishlistItems: defineTable({
        userId: v.id("users"),
        productId: v.id("products"),
        updatedAt: v.number(),
    }).index("by_user_id", ["userId"]),

    coupons: defineTable({
        code: v.string(),
        discountPercent: v.number(),
        expiresAt: v.number(),
        usageLimit: v.optional(v.number()),
        usedCount: v.number(),
    }).index("by_code", ["code"]),

    newsletterSubscribers: defineTable({
        email: v.string(),
        subscribedAt: v.number(),
    }).index("by_email", ["email"]),
});
