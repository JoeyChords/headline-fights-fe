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

vi.mock("@mui/x-charts/BarChart", () => ({
  BarChart: ({ dataset }: { dataset: unknown[] }) => <div data-testid="bar-chart">rows:{dataset.length}</div>,
}));

import PublicationForm from "../surveyForm";
import type { HeadlineData, UserData } from "../surveyForm";
import { useRouter } from "next/navigation";

const mockFetch = vi.fn();
const mockPush = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  mockPush.mockReset();
  vi.mocked(useRouter).mockReturnValue({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  });
});

const headline: HeadlineData = {
  _id: "abc123",
  headline: "Test Headline",
  photo_source_url: "http://example.com/photo.jpg",
  publication: "cnn",
};

const user: UserData = {
  id: "user1",
  username: "testuser",
  email: "test@example.com",
};

const fetchOnClick = vi.fn();

describe("PublicationForm (surveyForm)", () => {
  it("renders the survey form with radio groups and submit button", () => {
    render(<PublicationForm user={user} headlines={headline} fetchOnClick={fetchOnClick} />);
    expect(screen.getByText("Guess the news source:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByLabelText("CNN")).toBeInTheDocument();
    expect(screen.getByLabelText("Fox News")).toBeInTheDocument();
  });

  it("submit button is disabled until all questions answered", () => {
    render(<PublicationForm user={user} headlines={headline} fetchOnClick={fetchOnClick} />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("shows correct message and chart when publication is guessed correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        isAuthenticated: true,
        publicationStats: {
          userPub1Percent: 60,
          crowdPub1Percent: 55,
          userPub2Percent: 40,
          crowdPub2Percent: 45,
        },
      }),
    });

    render(<PublicationForm user={user} headlines={headline} fetchOnClick={fetchOnClick} />);
    const user_ = userEvent.setup();

    // Pick first radio option for question 1 (True)
    const trueRadios = screen.getAllByRole("radio", { name: /true/i });
    await user_.click(trueRadios[0]);

    // Pick first radio option for question 2 (True)
    await user_.click(trueRadios[1]);

    // Pick CNN (correct answer matches headline.publication = "cnn")
    await user_.click(screen.getByLabelText("CNN"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/you got the source right/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("shows incorrect message when publication is guessed wrong", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        isAuthenticated: true,
        publicationStats: {
          userPub1Percent: 40,
          crowdPub1Percent: 55,
          userPub2Percent: 60,
          crowdPub2Percent: 45,
        },
      }),
    });

    render(<PublicationForm user={user} headlines={headline} fetchOnClick={fetchOnClick} />);
    const user_ = userEvent.setup();

    const trueRadios = screen.getAllByRole("radio", { name: /true/i });
    await user_.click(trueRadios[0]);
    await user_.click(trueRadios[1]);

    // Pick Fox News (wrong — headline.publication is "cnn")
    await user_.click(screen.getByLabelText("Fox News"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/better luck next time/i)).toBeInTheDocument();
    });
  });

  it("redirects to /login when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));

    render(<PublicationForm user={user} headlines={headline} fetchOnClick={fetchOnClick} />);
    const user_ = userEvent.setup();

    const trueRadios = screen.getAllByRole("radio", { name: /true/i });
    await user_.click(trueRadios[0]);
    await user_.click(trueRadios[1]);
    await user_.click(screen.getByLabelText("CNN"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
