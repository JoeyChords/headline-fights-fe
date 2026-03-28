# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.3.1] - 2026-03-28

### Fixed

- Fixed SSR hydration mismatch — replaced the manual emotion cache implementation in `ThemeRegistry` with `AppRouterCacheProvider` from `@mui/material-nextjs`, ensuring emotion class name hashes are consistent between server and client.
- Fixed Fast Refresh performing a full reload on every render — `require("lodash/capitalize")` in `appBarLoggedIn.tsx` was a CommonJS call inside a client component, which breaks hot module replacement; replaced with an inline function.

### Changed

- Upgraded `@mui/material` and `@mui/icons-material` from 5.14.18 to 5.18.0 — resolves React 19 `element.ref` compatibility warning that was also contributing to Fast Refresh full reloads.
- Added `@mui/material-nextjs` for App Router cache integration.
- Removed `lodash` dependency — no longer used anywhere in the codebase.

## [1.3.0] - 2026-03-27

### Added

- TypeScript conversion Phase 5: [app/register/page.tsx](./app/register/page.tsx) — typed form handler, `Copyright` props, and `userInput`; [app/ThemeRegistry.tsx](./app/ThemeRegistry.tsx) — `ThemeRegistryProps` interface; [app/layout.tsx](./app/layout.tsx) — typed `children` prop.
- TypeScript conversion Phase 6: [app/game/surveyForm.tsx](./app/game/surveyForm.tsx), [app/game/headline.tsx](./app/game/headline.tsx), [app/game/page.tsx](./app/game/page.tsx) — full type coverage including `HeadlineData`, `UserData`, `HeadlinesApiResponse`, and `GameAuthResponse` interfaces; [app/game/classes/UserFeedback.ts](./app/game/classes/UserFeedback.ts) — converted from CJS to ES module export.
- Unit tests for [app/game/surveyForm.tsx](./app/game/surveyForm.tsx), [app/game/headline.tsx](./app/game/headline.tsx), [app/game/page.tsx](./app/game/page.tsx), [app/register/page.tsx](./app/register/page.tsx), and [app/forgotPassword/page.tsx](./app/forgotPassword/page.tsx).
- 60-second resend cooldown on [app/forgotPassword/page.tsx](./app/forgotPassword/page.tsx) — button shows countdown and re-enables as "Resend Email" after the timer expires.

### Fixed

- Fixed `GameAuthResponse` in [app/game/page.tsx](./app/game/page.tsx) — `user` is now optional and all accesses use optional chaining, preventing a TypeError crash when the backend omits `user` on `email_verified: false` responses.
- Fixed `pendingVerifyEmail` not being stored in sessionStorage — root cause was the above TypeError being caught and routing to `/login` before the `sessionStorage.setItem` call.
- Fixed [app/verify/page.tsx](./app/verify/page.tsx) — replaced `useEffect` sessionStorage read with a lazy `useState` initializer to prevent React StrictMode double-mount from clearing the stored email before the second run reads it.
- Fixed build error in [app/dashboard/page.tsx](./app/dashboard/page.tsx) — removed stale `.js` extension from `appBarLoggedIn` import after the file was converted to `.tsx`.

## [1.2.0] - 2026-03-27

### Added

- ESLint configured with `eslint-config-next` (includes TypeScript and React rules) and `eslint-config-prettier` — replaces the placeholder `lint` script.
- Prettier configured with project-consistent settings (double quotes, 2-space indent, 120-char width) — `format` and `format:check` scripts added.
- Vitest 4 + `@vitejs/plugin-react` + `@testing-library/react` set up for unit testing — replaces the placeholder `test` script; `test:watch` and `test:coverage` scripts added.
- `__mocks__/next/navigation.ts` and `__mocks__/next/image.tsx` manual mocks for use in component tests.
- `TS_CONVERSION.md` — phased plan and per-file checklist for the incremental JS → TypeScript migration.

### Changed

- Formatted all source files with Prettier as a one-time baseline.

## [1.1.3] - 2026-03-27

### Security

- Changed [app/logout/page.js](./app/logout/page.js) logout fetch from GET to POST to match the API change.
- Added per-IP rate limiting (5 requests per hour) and input validation to [app/api/contact/route.js](./app/api/contact/route.js) — name, email, and message are required, typed, and length-capped (100 / 254 / 2000 chars) before the Resend call is made.

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
