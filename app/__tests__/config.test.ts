import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("config", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_API_ENDPOINT", "http://localhost:8000");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("exports API_ENDPOINT from environment variable", async () => {
    const { default: config } = await import("../config");
    expect(config.API_ENDPOINT).toBe("http://localhost:8000");
  });

  it("exports correct static publication constants", async () => {
    const { default: config } = await import("../config");
    expect(config.PUB_1).toBe("CNN");
    expect(config.PUB_2).toBe("Fox News");
    expect(config.PUB_2_SHORT).toBe("Fox");
  });

  it("throws if NEXT_PUBLIC_API_ENDPOINT is not set", async () => {
    vi.unstubAllEnvs();
    delete process.env.NEXT_PUBLIC_API_ENDPOINT;
    await expect(import("../config")).rejects.toThrow("Missing NEXT_PUBLIC_API_ENDPOINT");
  });
});
