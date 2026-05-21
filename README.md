# Next Files App

A file manager built with Next.js, Clerk, Convex, and Tailwind CSS.

The app lets authenticated users upload files, browse their files, mark files as favorites, and move files to trash. Files can belong either to a personal user space or to a Clerk organization.

## Tech Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Clerk for authentication and organizations
- Convex for backend functions, database, and file storage
- Tailwind CSS
- Radix UI / shadcn-style local UI components
- React Hook Form + Zod

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL printed by Next.js, usually:

```text
http://localhost:3000
```

## Environment Variables

Create a local environment file and provide the required Clerk and Convex values.

Client-side variables:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Convex/server variable:

```bash
CLERK_WEBHOOK_SECRET=
```

The current Clerk domain is also hardcoded in:

- `convex/auth.config.ts`
- `convex/http.ts`

If you change Clerk instances, update those files as well.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run fix
```

- `dev` starts the Next.js development server.
- `build` creates a production build.
- `start` starts the production server after build.
- `lint` runs ESLint for app files.
- `fix` runs ESLint with auto-fix for app files.

## Project Structure

```text
app/
  dashboard/              Dashboard pages and file UI
  _components/            Shared app header/footer components
  ConvexClerkProvider.tsx Clerk + Convex provider setup
components/ui/            Local UI primitives
convex/                   Convex schema, queries, mutations, webhooks
hooks/                    Shared React hooks
lib/                      Shared utilities
public/                   Static assets
```

## Main Features

- Clerk sign-in/sign-out and organization support
- Convex-backed file upload flow
- File listing with search support
- Grid and table display modes
- Favorites support
- Soft delete / trash support
- Periodic permanent deletion via Convex internal mutation

## Current Work Areas

- `TypeSelect` is still a placeholder.
- File type state exists in the UI but is not yet wired into the list query.
- Some debug `console.log` calls remain.
- Favorites data exists, but cards currently receive a static `hasLike={false}` value.

## Notes

Generated Convex files in `convex/_generated` should not be edited manually. Update Convex source files and regenerate when needed.
