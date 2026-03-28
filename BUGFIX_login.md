# Login Bug Fix

## Root Cause

After a successful login, the game page calls the backend `/game` endpoint for auth. When
`email_verified: false`, the backend omits the `user` object from the response. The code then
crashes trying to access `response.user.email`, the `.catch()` fires, and the user is routed
to `/login` instead of `/verify`.

## Bug 1 (Primary) — `app/game/page.tsx`

`GameAuthResponse` declares `user` as required, but the backend omits it when
`email_verified: false`. Accessing `response.user.email` / `response.user.username` throws a
`TypeError`, caught by `.catch(() => router.push("/login"))`.

**Fix:** Make `user` optional in the interface and guard all accesses with optional chaining.

## Bug 2 (Secondary) — `app/login/page.tsx`

If the backend login response has `email_verified: true` but `isSignedIn` is not exactly the
string `"True"`, there is a silent failure: no redirect, no error shown, and `isLoading` is
never reset (submit button stays disabled).

**Fix:** Add an `else` clause inside the `email_verified: true` branch to show an error and
reset loading state.

## Files Modified

- `app/game/page.tsx`
- `app/login/page.tsx`
- `app/game/__tests__/page.test.tsx` (new test coverage)
- `app/login/__tests__/page.test.tsx` (new test coverage)
