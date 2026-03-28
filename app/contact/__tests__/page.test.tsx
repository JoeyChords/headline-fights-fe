import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation");
vi.mock("next/image");
vi.mock("@/app/components/app-bar/appBarLoggedOut", () => ({
  default: () => <div data-testid="app-bar" />,
}));
vi.mock("@/app/components/footer/footer", () => ({
  default: () => <footer data-testid="footer" />,
}));

import Contact from "../page";

describe("Contact page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders without crashing with key elements present", () => {
    render(<Contact />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { id: "msg-123" } }),
      })
    );
    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/message/i), "Hello there");
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
    await waitFor(() => expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument());
  });

  it("shows error message when submission fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: "Invalid input." }),
      })
    );
    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/message/i), "Hello there");
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("shows email validation error for an invalid email", async () => {
    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email address/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/message/i), "Hello there");
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
    await waitFor(() => expect(screen.getByText(/valid email address/i)).toBeInTheDocument());
  });
});
