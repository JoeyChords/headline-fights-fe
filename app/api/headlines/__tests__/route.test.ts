import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../route";

const headline = { id: "abc123", title: "Test Headline" };

describe("POST /api/headlines", () => {
  beforeEach(() => {
    vi.stubEnv("API_BASE_URL", "http://api.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns 200 with the first headline from upstream", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([headline, { id: "other" }]),
      })
    );
    const res = await POST();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual(headline);
  });

  it("returns the upstream error status when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
      })
    );
    const res = await POST();
    expect(res.status).toBe(403);
  });

  it("calls the upstream headlines endpoint via POST with credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([headline]),
      })
    );
    await POST();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("http://api.test/headlines", {
      method: "POST",
      credentials: "include",
    });
  });

  it("includes CORS headers in the response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([headline]),
      })
    );
    const res = await POST();
    expect(res.headers.get("access-control-allow-origin")).toBe("https://www.headlinefights.com");
    expect(res.headers.get("access-control-allow-credentials")).toBe("true");
  });
});
