import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    name: v.string(),
    ownerId: v.string(),
  }).index("by_ownerId", ["ownerId"]),
});
