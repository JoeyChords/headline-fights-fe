import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("next/navigation");
vi.mock("next/image");
vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));
vi.mock("@/app/components/app-bar/appBarLoggedIn", () => ({
  default: () => <div data-testid="app-bar" />,
}));

import { useRouter } from "next/navigation";
import Logout from "../page";

describe("Logout page", () => {
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
    vi.stubGlobal("sessionStorage", { clear: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders without crashing and shows a loading spinner", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) }));
    render(<Logout />);
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    // CircularProgress renders an svg with role="progressbar"
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("redirects to /login and clears session on successful logout", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) }));
    render(<Logout />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));
    expect(vi.mocked(sessionStorage.clear)).toHaveBeenCalled();
  });

  it("redirects to /login and clears session even when logout fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<Logout />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));
    expect(vi.mocked(sessionStorage.clear)).toHaveBeenCalled();
  });
});
