# TypeScript Conversion Plan

## Strategy

The project already has `strict: true` and `allowJs: true` in `tsconfig.json`, so JS and TS files
coexist safely. The goal is to convert all `.js` files to `.ts`/`.tsx` and clean up `any` types in
files that were already converted, moving toward a fully strict, well-typed codebase.

**Rules for each conversion:**

1. Rename the file (`.js` → `.ts` for non-JSX, `.js` → `.tsx` for JSX).
2. Fix all type errors. Use `any` only as a last resort and mark it with `// TODO: type`.
3. Add prop interfaces or local types where needed — do not import `any` from MUI or elsewhere.
4. Write unit tests in a `__tests__/` folder adjacent to the file.
5. `npm run lint` must pass clean.
6. `npm run test` must pass.
7. `npm run format` before committing.

**Testing conventions:**

- Mock `next/navigation` with `vi.mock("next/navigation")` — manual mock is in `__mocks__/next/navigation.ts`.
- Mock `next/image` with `vi.mock("next/image")` — manual mock is in `__mocks__/next/image.tsx`.
- Mock `fetch` with `vi.stubGlobal("fetch", vi.fn())` per test or in `beforeEach`.
- Test files live at e.g. `app/login/__tests__/page.test.tsx`.
- Every page test should cover at minimum: renders without crashing, key elements present, primary
  user interaction (form submit / redirect), error state.

---

## Phase 1 — Non-React Utilities

Simple modules with no JSX. Convert to `.ts`. Tests verify exports have the expected shape.

- [x] `app/config.js` → `config.ts`
- [x] `app/fonts.js` → `fonts.ts`

---

## Phase 2 — API Routes

Pure Next.js Route Handlers — no React, no JSX. Convert to `.ts`.
Tests mock the upstream `fetch` or Resend client and verify response shape and status codes.

- [x] `app/api/contact/route.js` → `route.ts`
- [x] `app/api/home/route.js` → `route.ts`
- [x] `app/api/login/route.js` → `route.ts`
- [x] `app/api/logout/route.js` → `route.ts`
- [x] `app/api/register/route.js` → `route.ts`
- [x] `app/api/headlines/route.js` → `route.ts`

---

## Phase 3 — Auth & Simple Pages

Ordered by complexity (simplest first). All use `useRouter` and `fetch`.
Tests cover: render, key UI elements, form submit (mock fetch), redirect, error state.

- [x] `app/logout/page.js` → `page.tsx` _(no form, just redirect)_
- [x] `app/contact/page.js` → `page.tsx` _(simple contact form)_
- [x] `app/forgotPassword/page.js` → `page.tsx`
- [x] `app/verify/page.js` → `page.tsx`
- [x] `app/login/page.js` → `page.tsx`
- [x] `app/resetPassword/page.js` → `page.tsx` _(URL param parsing via useEffect)_

---

## Phase 4 — App Bar Components

Shared across every page. Convert to `.tsx`. Once typed, pages that import them benefit
from prop checking. Tests: render with required props, key interactive elements.

- [x] `app/components/app-bar/appBarLoggedOut.js` → `appBarLoggedOut.tsx`
- [x] `app/components/app-bar/appBarLoginPage.js` → `appBarLoginPage.tsx`
- [x] `app/components/app-bar/appBarRegisterPage.js` → `appBarRegisterPage.tsx`
- [x] `app/components/app-bar/appBarHomePage.js` → `appBarHomePage.tsx`
- [x] `app/components/app-bar/appBarLoggedIn.js` → `appBarLoggedIn.tsx`

---

## Phase 5 — Existing TSX Cleanup (`any` removal)

These files are already TypeScript but use `any`. No rename needed — just tighten types and add tests.

**Shared components (no external data dependencies — easiest to test in isolation):**

- [ ] `app/components/footer/footer.tsx`
- [ ] `app/components/homePage/footer.tsx`
- [ ] `app/components/terms-and-privacy-footer/terms-and-privacy-footer.tsx`
- [ ] `app/components/homePage/statsBox.tsx`
- [ ] `app/components/homePage/howItWorksBox.tsx`
- [ ] `app/components/homePage/ctaButton.tsx`
- [ ] `app/components/homePage/statsComponent.tsx`
- [ ] `app/components/homePage/howItWorksComponent.tsx`
- [ ] `app/components/homePage/stats.tsx`
- [ ] `app/components/homePage/howItWorks.tsx`

**Data-dependent components:**

- [ ] `app/dashboard/components/headlineCount.tsx`
- [ ] `app/dashboard/components/guessAccuracyChart.tsx`
- [ ] `app/game/components/guessAccuracyChart.tsx`

**Pages and root files:**

- [ ] `app/register/page.tsx` _(many `any` — event handlers, form data)_
- [ ] `app/ThemeRegistry.tsx`
- [ ] `app/layout.tsx`

---

## Phase 6 — Game Flow

Most complex part of the app. Multiple interacting components with shared state.
Convert last so earlier phases have established type patterns to follow.

- [ ] `app/game/page.js` → `page.tsx`
- [ ] `app/game/headline.js` → `headline.tsx`
- [ ] `app/game/surveyForm.js` → `surveyForm.tsx`

---

## Progress

**Total files:** 38 (22 JS conversions + 16 TSX cleanups)
**Converted:** 0
**Remaining:** 38
