import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

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

import Headline from "../headline";
import { useRouter } from "next/navigation";

const mockFetch = vi.fn();
const mockPush = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  mockPush.mockReset();
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

const headlineResponse = {
  isAuthenticated: true,
  headline: {
    _id: "abc123",
    headline: "Breaking News Story",
    photo_source_url: "http://example.com/photo.jpg",
    publication: "cnn",
  },
  user: { id: "user1", username: "testuser", email: "test@example.com" },
};

describe("Headline", () => {
  it("shows loading spinner initially then renders headline after fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => headlineResponse,
    });

    render(<Headline />);
    // Loading spinner should be present first
    expect(document.querySelector(".MuiCircularProgress-root")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText("Breaking News Story")).toBeInTheDocument();
    });
  });

  it("shows 'No headlines to show' when headline is empty", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...headlineResponse,
        headline: { ...headlineResponse.headline, headline: "" },
      }),
    });

    render(<Headline />);

    await waitFor(() => {
      expect(screen.getByText("No headlines to show")).toBeInTheDocument();
    });
  });

  it("redirects to /login when not authenticated", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isAuthenticated: false }),
    });

    render(<Headline />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("redirects to /login when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));

    render(<Headline />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
