import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation");
vi.mock("next/image");
vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));
vi.mock("@/app/components/app-bar/appBarLoggedOut", () => ({
  default: () => <div data-testid="app-bar" />,
}));
vi.mock("@/app/components/footer/footer", () => ({
  default: () => <footer data-testid="footer" />,
}));

import { useRouter } from "next/navigation";
import ResetPassword from "../page";

// Valid UUID and email for tests that should pass link validation.
const VALID_EMAIL = "test@example.com";
const VALID_TOKEN = "550e8400-e29b-41d4-a716-446655440000";
const STRONG_PASSWORD = "P@ssword1!";

async function submitPassword(password: string) {
  await userEvent.type(screen.getByLabelText(/password/i), password);
  fireEvent.submit(screen.getByRole("button", { name: /set password/i }).closest("form")!);
}

describe("ResetPassword page", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    } as ReturnType<typeof useRouter>);

    // Simulate URL params set by the password reset email link.
    vi.stubGlobal(
      "location",
      Object.defineProperty(Object.create(window.location), "search", {
        value: `?email=${encodeURIComponent(VALID_EMAIL)}&token=${VALID_TOKEN}`,
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders without crashing with key elements present", () => {
    render(<ResetPassword />);
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set password/i })).toBeInTheDocument();
  });

  it("redirects to /login on successful reset", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ submitted_in_time: true }),
      })
    );
    render(<ResetPassword />);
    await submitPassword(STRONG_PASSWORD);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));
  });

  it("shows weak-password error without calling fetch", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
    render(<ResetPassword />);
    await submitPassword("weak");
    await waitFor(() => expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument());
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows expired-link error when submitted_in_time is false and user_exists is true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ submitted_in_time: false, user_exists: true }),
      })
    );
    render(<ResetPassword />);
    await submitPassword(STRONG_PASSWORD);
    await waitFor(() => expect(screen.getByText(/link has expired/i)).toBeInTheDocument());
  });

  it("shows rate-limit error for 429 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    render(<ResetPassword />);
    await submitPassword(STRONG_PASSWORD);
    await waitFor(() => expect(screen.getByText(/too many attempts/i)).toBeInTheDocument());
  });

  it("disables the button while submitting", async () => {
    let resolve: (v: unknown) => void;
    const pending = new Promise((r) => (resolve = r));
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));
    render(<ResetPassword />);
    await submitPassword(STRONG_PASSWORD);
    expect(screen.getByRole("button", { name: /set password/i })).toBeDisabled();
    resolve!({ ok: true, status: 200, json: async () => ({ submitted_in_time: true }) });
  });
});
