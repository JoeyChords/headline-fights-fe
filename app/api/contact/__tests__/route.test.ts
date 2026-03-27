import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mockSend = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: mockSend } };
  }),
}));

import { POST } from "../route";

let ipCounter = 1;

function makeRequest(body: Record<string, unknown>, headers: Record<string, string> = {}): NextRequest {
  // Each call gets a fresh IP by default so tests don't share rate-limit state.
  const defaultIp = `10.0.0.${ipCounter++}`;
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": defaultIp, ...headers },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Test User",
  email: "test@example.com",
  message: "Hello from the test suite.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockSend.mockResolvedValue({ data: { id: "mock-id" }, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with valid input", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ ...validBody, name: "" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid input.");
  });

  it("returns 400 when email exceeds max length", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "a".repeat(255) + "@x.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message exceeds max length", async () => {
    const res = await POST(makeRequest({ ...validBody, message: "x".repeat(2001) }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when a field is the wrong type", async () => {
    const res = await POST(makeRequest({ ...validBody, name: 42 }));
    expect(res.status).toBe(400);
  });

  it("returns 429 after exceeding rate limit", async () => {
    const ip = "192.168.99.99";
    const req = () =>
      new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify(validBody),
      });
    for (let i = 0; i < 5; i++) await POST(req());
    const res = await POST(req());
    expect(res.status).toBe(429);
  });

  it("returns 500 when Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "send failed" } });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });
});
