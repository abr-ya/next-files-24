# Project Notes for Codex

## Overview

Next Files App is a Next.js 14 file manager. It uses Clerk for auth and organizations, Convex for data/storage/backend functions, Tailwind CSS, and local shadcn/Radix-style UI components.

## Commands

- `npm run dev` - start the Next.js dev server.
- `npm run build` - production build.
- `npm run lint` - lint `app/**/*.{js,ts,tsx}` with quiet output.
- `npm run fix` - lint and auto-fix app files.

`node_modules` is present in this workspace. `.npmrc` sets `legacy-peer-deps=true`.

## Important Paths

- `app/layout.tsx` - root layout, global provider wrapper, header/footer/toaster.
- `app/ConvexClerkProvider.tsx` - Clerk + Convex provider setup. Requires public env vars.
- `app/page.tsx` - simple home/test page.
- `app/dashboard/layout.tsx` - dashboard shell with side nav.
- `app/dashboard/files/page.tsx` - all files page.
- `app/dashboard/favorites/page.tsx` - favorites page.
- `app/dashboard/trash/page.tsx` - deleted files page.
- `app/dashboard/_components/FilesList.tsx` - main dashboard list UI and filters.
- `app/dashboard/_components/UploadContainer.tsx` - upload flow, MIME-to-file-type mapping.
- `app/dashboard/_components/FileCard.tsx` - grid card preview.
- `app/dashboard/_components/FileCardMenu.tsx` - open/favorite/delete menu.
- `app/dashboard/_components/TypeSelect.tsx` - currently a placeholder.
- `app/dashboard/formSchema.ts` - upload form schema/defaults.
- `components/ui/*` - local UI primitives.
- `convex/schema.ts` - Convex tables and indexes.
- `convex/files.ts` - file access checks, queries, mutations, deletion cron target.
- `convex/users.ts` - Clerk webhook-backed user/org membership mutations.
- `convex/http.ts` - Clerk webhook endpoint.
- `convex/auth.config.ts` - Convex auth provider config.

## Environment

Expected public client env vars:

- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

Expected Convex/server env vars:

- `CLERK_WEBHOOK_SECRET`

Current Clerk domain is hardcoded in `convex/auth.config.ts` and `convex/http.ts` as:

- `https://shining-cattle-95.clerk.accounts.dev`

If changing Clerk instances, update both places or refactor to a shared env-based value.

## Data Model

`files`:

- `name`
- `ownerId` - user id or organization id from Clerk.
- `type` - `image | csv | pdf | txt | zip`
- `fileId` - Convex storage id.
- `userId` - uploader.
- `shouldDelete` - optional soft-delete marker.

`favorites` links user, owner, and file.

`users` stores Clerk token identifier, profile info, and org memberships/roles.

Access flow:

- `hasAccessToOrg` checks current Convex auth identity against `users`.
- A user can access their own owner id or org ids in `ownerIds`.
- Delete is allowed for uploader or org admin.

## Known Current Work Areas

- `TypeSelect.tsx` is a stub, and `FilesList.tsx` keeps `type` state but does not pass it to `api.files.getFiles`.
- Table view in `FilesList.tsx` is still TODO.
- Several debug `console.log` calls remain in dashboard components and `convex/http.ts`.
- `FileCard.tsx` has icons/previews for `image`, `csv`, and `pdf`, but schema also allows `txt` and `zip`.
- Upload MIME mapping includes zip/image/pdf/csv, but not plain text.
- Delete flow marks files with `shouldDelete`; permanent deletion is handled by `deleteAllFiles` internal mutation for cron.
- Favorites query support exists in Convex, but the UI currently passes `hasLike={false}` to every `FileCard`.

## Style and Editing Notes

- Keep changes scoped and follow existing patterns.
- Prefer existing UI primitives under `components/ui`.
- Use `@/*` imports where the project already does.
- Be careful with generated Convex files under `convex/_generated`; do not edit them manually unless the user explicitly asks.
- Do not overwrite user changes. Check `git status --short` before larger edits.
