# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.1.2] - 2026-03-27

### Security

- Added `isLoading` state to all auth form submit buttons (login, register, verify, forgotPassword, resetPassword) — buttons are disabled while a request is in flight, preventing duplicate submissions.
- Removed `setHelperText("Loading...")` calls from login and register — the disabled button state communicates pending submission without exposing internal state as a user-facing string.
- Converted [app/register/page.tsx](./app/register/page.tsx) form handler from promise chains to `async/await` for consistent `isLoading` reset on all exit paths.

## [1.1.1] - 2026-03-27

### Security

- Removed unused `DATA_API_KEY` from the headlines API route URL — the key was being leaked in request URLs with no corresponding validation on the server.
- Replaced email address URL query parameters (`?email=`) with `sessionStorage` across login, register, game, and dashboard — email is no longer exposed in browser history, referrer headers, or server logs.
- Replaced username URL query parameters (`?name=`) with `sessionStorage` across all pages and the app bar — username no longer appears in URLs or logs.
- Fixed auth bypass in [app/settings/page.tsx](./app/settings/page.tsx) — the page previously skipped the API authentication check if a `?name=` query parameter was present, allowing unauthenticated access.
- Added HTTP status validation to every `fetch` call — non-OK responses (including 429 Too Many Requests) no longer fail silently or attempt to parse non-JSON error bodies.
- Added user-visible rate limit messages (429 handling) on login, verify, forgotPassword, and resetPassword pages.
- Added email and UUID format validation in [app/resetPassword/page.js](./app/resetPassword/page.js) before the reset request is sent to the API.
- Fixed undefined `user_exists` reference in [app/resetPassword/page.js](./app/resetPassword/page.js) — corrected to `response.user_exists`.
- Removed `console.log` statements from [app/game/page.js](./app/game/page.js), [app/game/surveyForm.js](./app/game/surveyForm.js), [app/api/home/route.js](./app/api/home/route.js), and [app/api/logout/route.js](./app/api/logout/route.js).
- `sessionStorage.removeItem("userName")` is now called on logout to clear client-side state.

## [1.1.0] - 2026-03-26

### Added

- Local development setup guidance in the README.

### Changed

- Pinned the frontend runtime to Node 24 for local and deploy consistency.
- Migrated the contact flow from Nodemailer/SendGrid to Resend.
- Switched frontend API configuration to `NEXT_PUBLIC_API_ENDPOINT` via [app/config.js](./app/config.js).
- Upgraded the frontend dependency stack and build configuration for current Next.js and Tailwind compatibility.
- Restored the UI to the MUI 5 and React 18 stack to preserve the original visual behavior.
- Moved the Tailwind config to [tailwind.config.mjs](./tailwind.config.mjs) and wired it from [app/globals.css](./app/globals.css).
- Updated the local font setup in [app/fonts.js](./app/fonts.js) and [app/layout.tsx](./app/layout.tsx) so the original font choices render in local and development builds.

### Security

- Performed dependency upgrades and lockfile refreshes to eliminate known `npm audit` vulnerabilities in the frontend package set.

### Fixed

- Restored homepage, footer, game, register, and dashboard layouts to the older MUI-compatible grid behavior.
- Fixed invalid nested typography markup in several pages and components to avoid hydration warnings while preserving the existing structure.
