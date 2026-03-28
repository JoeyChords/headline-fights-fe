import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue("application/json"),
  }),
}));

import { POST } from "../route";

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = { email: "test@example.com", password: "password123" };

describe("POST /api/login", () => {
  beforeEach(() => {
    vi.stubEnv("API_BASE_URL", "http://api.test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        text: vi.fn().mockResolvedValue(JSON.stringify({ isAuthenticated: true })),
        headers: {
          getSetCookie: vi.fn().mockReturnValue(["session=abc; Path=/; HttpOnly"]),
        },
      })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns the upstream status code", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
  });

  it("calls the upstream login endpoint with credentials", async () => {
    await POST(makeRequest(validBody));
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("http://api.test/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
      credentials: "include",
    });
  });

  it("forwards Set-Cookie headers from upstream", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.headers.get("set-cookie")).toContain("session=abc");
  });

  it("includes CORS headers in the response", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.headers.get("access-control-allow-origin")).toBe("https://www.headlinefights.com");
    expect(res.headers.get("access-control-allow-credentials")).toBe("true");
  });

  it("returns 401 when upstream returns 401", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 401,
        text: vi.fn().mockResolvedValue(JSON.stringify({ isAuthenticated: false })),
        headers: { getSetCookie: vi.fn().mockReturnValue([]) },
      })
    );
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(401);
  });
});
