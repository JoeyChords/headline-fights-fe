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
import Verify from "../page";

async function submitCode(code: string) {
  await userEvent.type(screen.getByLabelText(/verification code/i), code);
  fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
}

describe("Verify page", () => {
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
      getItem: vi.fn().mockReturnValue("pending@example.com"),
      removeItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders without crashing with key elements present", () => {
    render(<Verify />);
    expect(screen.getByText("Verify Your Email")).toBeInTheDocument();
    expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("redirects to /game when email is verified", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ submitted_in_time: true, email_verified: true, name: "Alice" }),
      })
    );
    render(<Verify />);
    await submitCode("123456");
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/game"));
    expect(vi.mocked(sessionStorage.setItem)).toHaveBeenCalledWith("userName", "Alice");
  });

  it("shows wrong-code error when submitted_in_time is true but email_verified is false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ submitted_in_time: true, email_verified: false }),
      })
    );
    render(<Verify />);
    await submitCode("000000");
    await waitFor(() => expect(screen.getByText(/something is wrong with the code/i)).toBeInTheDocument());
  });

  it("shows expired-code error when submitted_in_time is false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ submitted_in_time: false }),
      })
    );
    render(<Verify />);
    await submitCode("000000");
    await waitFor(() => expect(screen.getByText(/code has expired/i)).toBeInTheDocument());
  });

  it("shows rate-limit error for a 429 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    render(<Verify />);
    await submitCode("123456");
    await waitFor(() => expect(screen.getByText(/too many attempts/i)).toBeInTheDocument());
  });

  it("disables submit button while loading", async () => {
    let resolve: (v: unknown) => void;
    const pending = new Promise((r) => (resolve = r));
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));
    render(<Verify />);
    await submitCode("123456");
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    resolve!({
      ok: true,
      status: 200,
      json: async () => ({ submitted_in_time: true, email_verified: true, name: "" }),
    });
  });
});
