import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
    // todo: fileId, orgId, type
  },
  async handler(ctx, args) {
    // todo: checkAccess

    await ctx.db.insert("files", {
      name: args.name,
      // todo: fileId, orgId, type
      // todo: userId
    });
  },
});

export const getFiles = query({
  async handler(ctx) {
    // todo: check access

    const files = await ctx.db.query("files").collect();

    return files;
  },
});
