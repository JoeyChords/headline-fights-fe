import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../route";

describe("POST /api/logout", () => {
  beforeEach(() => {
    vi.stubEnv("API_BASE_URL", "http://api.test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        text: vi.fn().mockResolvedValue("OK"),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns 200 with data from upstream", async () => {
    const res = await POST();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data).toBe("OK");
  });

  it("calls the upstream logout endpoint via POST with credentials", async () => {
    await POST();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("http://api.test/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
    });
  });
});
