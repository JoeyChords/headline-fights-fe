import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));

vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

vi.mock("next/navigation");

import SignUp from "../page";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  Object.defineProperty(window, "screen", {
    value: { orientation: { addEventListener: vi.fn() } },
    writable: true,
  });
});

describe("SignUp page", () => {
  it("renders without crashing with key elements", () => {
    render(<SignUp />);
    expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<SignUp />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email address/i), "notanemail");
    await user.type(screen.getByLabelText(/password/i), "StrongPass1!");
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for weak password", async () => {
    render(<SignUp />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "weak");
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("redirects to /verify on successful registration", async () => {
    const { useRouter } = await import("next/navigation");
    const push = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push,
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ available: "True" }),
    });
    render(<SignUp />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass1!");
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }).closest("form")!);
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/verify");
    });
  });

  it("shows error when email is already in use", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ available: "False" }),
    });
    render(<SignUp />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email address/i), "taken@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass1!");
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/already in use/i)).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));
    render(<SignUp />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass1!");
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
