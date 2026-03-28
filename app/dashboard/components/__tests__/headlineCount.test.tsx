import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/app/config", () => ({
  default: { API_ENDPOINT: "http://api.test", PUB_1: "CNN", PUB_2: "Fox News", PUB_2_SHORT: "Fox" },
}));

import HeadlineCount from "../headlineCount";

describe("HeadlineCount", () => {
  it("renders total and per-publication counts", () => {
    render(<HeadlineCount total={300} pub1Total={150} pub2Total={150} />);
    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText(/CNN.*150/)).toBeInTheDocument();
    expect(screen.getByText(/Fox News.*150/)).toBeInTheDocument();
  });

  it("shows the Headlines Rated label", () => {
    render(<HeadlineCount total={0} pub1Total={0} pub2Total={0} />);
    expect(screen.getByText("Headlines Rated")).toBeInTheDocument();
  });
});
