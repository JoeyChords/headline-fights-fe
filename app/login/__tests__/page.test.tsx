import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation");
vi.mock("next/image");
vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));
vi.mock("@/app/components/app-bar/appBarLoginPage", () => ({
  default: () => <div data-testid="app-bar" />,
}));
vi.mock("@/app/components/footer/footer", () => ({
  default: () => <footer data-testid="footer" />,
}));

import { useRouter } from "next/navigation";
import SignIn from "../page";

async function fillAndSubmit(email: string, password: string) {
  await userEvent.type(screen.getByLabelText(/email address/i), email);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
}

describe("Login page", () => {
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
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders without crashing with key elements present", () => {
    render(<SignIn />);
    expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot my password/i)).toBeInTheDocument();
  });

  it("redirects to /game on successful login with verified email", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ email_verified: true, isSignedIn: "True", user: "Alice" }),
      })
    );
    render(<SignIn />);
    await fillAndSubmit("test@example.com", "Password1!");
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/game"));
    expect(vi.mocked(sessionStorage.setItem)).toHaveBeenCalledWith("userName", "Alice");
  });

  it("redirects to /verify for unverified email", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ email_verified: false }),
      })
    );
    render(<SignIn />);
    await fillAndSubmit("test@example.com", "Password1!");
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/verify"));
  });

  it("shows error for 401 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }));
    render(<SignIn />);
    await fillAndSubmit("test@example.com", "wrongpass");
    await waitFor(() => expect(screen.getByText(/email or password/i)).toBeInTheDocument());
  });

  it("shows rate-limit error for 429 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    render(<SignIn />);
    await fillAndSubmit("test@example.com", "Password1!");
    await waitFor(() => expect(screen.getByText(/too many login attempts/i)).toBeInTheDocument());
  });

  it("disables the button while submitting", async () => {
    let resolve: (v: unknown) => void;
    const pending = new Promise((r) => (resolve = r));
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));
    render(<SignIn />);
    await fillAndSubmit("test@example.com", "Password1!");
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
    resolve!({ ok: true, status: 200, json: async () => ({ email_verified: true, isSignedIn: "True", user: "" }) });
  });
});
