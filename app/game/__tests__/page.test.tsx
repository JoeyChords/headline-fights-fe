import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";

vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));

vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

vi.mock("next/navigation");
// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
vi.mock("next/image", () => ({ default: (props: Record<string, unknown>) => <img {...props} /> }));

vi.mock("@mui/x-charts/BarChart", () => ({
  BarChart: ({ dataset }: { dataset: unknown[] }) => <div data-testid="bar-chart">rows:{dataset.length}</div>,
}));

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

import Home from "../page";
import { useRouter } from "next/navigation";

const mockFetch = vi.fn();
const mockPush = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  mockPush.mockReset();
  sessionStorageMock.clear();
  // Return a stable router reference so [router] dep doesn't re-trigger the effect
  vi.mocked(useRouter).mockReturnValue({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  });
});

describe("Game page (Home)", () => {
  it("shows loading spinner while auth check is in flight", () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<Home />);
    expect(document.querySelector(".MuiCircularProgress-root")).toBeTruthy();
  });

  it("redirects to /login when not authenticated", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isAuthenticated: false }),
    });

    render(<Home />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("redirects to /verify when email not verified", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        isAuthenticated: true,
        email_verified: false,
        user: { username: "testuser", email: "test@example.com" },
      }),
    });

    render(<Home />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/verify");
    });
  });

  it("redirects to /login when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));

    render(<Home />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
