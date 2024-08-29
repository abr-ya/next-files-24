import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

export async function hasAccessToOrg(ctx: QueryCtx | MutationCtx, ownerId: string) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  if (!user) return null;

  const hasAccess = user.ownerIds.some((item) => item.ownerId === ownerId) || user.tokenIdentifier.includes(ownerId);

  if (!hasAccess) return null;

  return { user };
}

export const createFile = mutation({
  args: {
    name: v.string(),
    ownerId: v.string(),
    // todo: fileId, ownerId, type
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.ownerId);

    if (!hasAccess) {
      throw new ConvexError("you do not have access to this org");
    }

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
