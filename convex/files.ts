import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
    ownerId: v.string(),
    // todo: fileId, ownerId, type
  },
  async handler(ctx, args) {
    // todo: checkAccess

    await ctx.db.insert("files", {
      name: args.name,
      ownerId: args.ownerId,
      // todo: fileId, type
      // todo: userId
    });
  },
});

export const getFiles = query({
  args: {
    ownerId: v.string(),
  },
  async handler(ctx, args) {
    // todo: check access
    const hasAccess = true;

    if (!hasAccess) return [];

    const files = await ctx.db
      .query("files")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    return files;
  },
});
