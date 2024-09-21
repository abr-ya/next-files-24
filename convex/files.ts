import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { fileTypes } from "./schema";
import { Id } from "./_generated/dataModel";

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

async function hasAccessToFile(ctx: QueryCtx | MutationCtx, fileId: Id<"files">) {
  const file = await ctx.db.get(fileId);
  if (!file) return null;

  const hasAccess = await hasAccessToOrg(ctx, file.ownerId);
  if (!hasAccess) return null;

  return { user: hasAccess.user, file };
}

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("you must be logged in to upload a file");

  return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
  args: {
    name: v.string(),
    ownerId: v.string(),
    fileId: v.id("_storage"),
    type: fileTypes,
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.ownerId);

    if (!hasAccess) {
      throw new ConvexError("you do not have access to this org");
    }

    await ctx.db.insert("files", {
      name: args.name,
      ownerId: args.ownerId,
      fileId: args.fileId,
      type: args.type,
      userId: hasAccess.user._id,
    });
  },
});

export const getFiles = query({
  args: {
    ownerId: v.string(),
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.ownerId);

    if (!hasAccess) return [];

    let files = await ctx.db
      .query("files")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    if (args.query) {
      files = files.filter((file) => file.name.toLowerCase().includes((args.query as string).toLowerCase()));
    }

    const filesWithUrl = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.fileId),
      })),
    );

    return filesWithUrl;
  },
});

export const toggleFavorite = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);

    if (!access) {
      throw new ConvexError("no access to file");
    }

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_userId_ownerId_fileId", (q) =>
        q.eq("userId", access.user._id).eq("ownerId", access.file.ownerId).eq("fileId", access.file._id),
      )
      .first();

    if (!favorite) {
      await ctx.db.insert("favorites", {
        fileId: access.file._id,
        userId: access.user._id,
        ownerId: access.file.ownerId,
      });
    } else {
      await ctx.db.delete(favorite._id);
    }
  },
});
