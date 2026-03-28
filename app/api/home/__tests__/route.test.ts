import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "../route";

describe("GET /api/home", () => {
  beforeEach(() => {
    vi.stubEnv("API_BASE_URL", "http://api.test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        text: vi.fn().mockResolvedValue("hello"),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns 200 with data from upstream", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data).toBe("hello");
  });

  it("calls the upstream API with cors and credentials", async () => {
    await GET();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("http://api.test/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
  });
});
