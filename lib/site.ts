// Single source of truth for the canonical site URL.
//
// Set NEXT_PUBLIC_SITE_URL in your deployment (e.g. Vercel env vars) to your
// real domain. Falls back to the production domain so nothing breaks locally
// or in preview builds. The trailing slash is stripped so we can safely
// concatenate paths (`${siteUrl}/research`).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://kaiwenluo.me";
