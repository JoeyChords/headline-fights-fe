# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.1.0] - 2026-03-26

### Added

- Local development setup guidance in the README.

### Changed

- Pinned the frontend runtime to Node 24 for local and deploy consistency.
- Migrated the contact flow from Nodemailer/SendGrid to Resend.
- Switched frontend API configuration to environment-driven local and development behavior via [app/config.js](./app/config.js).
- Upgraded the frontend dependency stack and build configuration for current Next.js and Tailwind compatibility.
- Restored the UI to the MUI 5 and React 18 stack to preserve the original visual behavior.
- Moved the Tailwind config to [tailwind.config.mjs](./tailwind.config.mjs) and wired it from [app/globals.css](./app/globals.css).
- Updated the local font setup in [app/fonts.js](./app/fonts.js) and [app/layout.tsx](./app/layout.tsx) so the original font choices render in local and development builds.

### Security

- Performed dependency upgrades and lockfile refreshes to eliminate known `npm audit` vulnerabilities in the frontend package set.

### Fixed

- Restored homepage, footer, game, register, and dashboard layouts to the older MUI-compatible grid behavior.
- Fixed invalid nested typography markup in several pages and components to avoid hydration warnings while preserving the existing structure.
