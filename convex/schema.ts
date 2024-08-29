import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  files: defineTable({
    name: v.string(),
    ownerId: v.string(),
  }).index("by_ownerId", ["ownerId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    ownerIds: v.array(
      v.object({
        ownerId: v.string(),
        role: roles,
      }),
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
