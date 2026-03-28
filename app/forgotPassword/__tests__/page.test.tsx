import { describe, expect, it, vi, afterEach } from "vitest";
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

import ForgotPassword from "../page";

async function submitForm(email: string) {
  await userEvent.type(screen.getByLabelText(/email/i), email);
  fireEvent.submit(screen.getByRole("button").closest("form")!);
}

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("ForgotPassword page", () => {
  it("renders without crashing with key elements present", () => {
    render(<ForgotPassword />);
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /email me/i })).toBeInTheDocument();
  });

  it("shows success message and disabled countdown button when email_sent is true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ email_sent: true }),
      })
    );
    render(<ForgotPassword />);
    await submitForm("test@example.com");
    await waitFor(() => expect(screen.getByText(/your email has been sent/i)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /resend in/i })).toBeDisabled();
  });

  it("disables the button while submitting", async () => {
    let resolve: (v: unknown) => void;
    const pending = new Promise((r) => (resolve = r));
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));
    render(<ForgotPassword />);
    await submitForm("test@example.com");
    expect(screen.getByRole("button", { name: /email me/i })).toBeDisabled();
    resolve!({ ok: true, status: 200, json: async () => ({ email_sent: true }) });
  });

  it("shows error for a 429 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    render(<ForgotPassword />);
    await submitForm("test@example.com");
    await waitFor(() => expect(screen.getByText(/too many attempts/i)).toBeInTheDocument());
  });

  it("shows generic error on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<ForgotPassword />);
    await submitForm("test@example.com");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("button is not disabled on error responses — user can try again", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<ForgotPassword />);
    await submitForm("test@example.com");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /email me/i })).toBeEnabled();
  });
});
