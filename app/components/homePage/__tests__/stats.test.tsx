import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/app/components/homePage/statsBox", () => ({
  default: ({ component }: { component: React.ReactNode }) => <div>{component}</div>,
}));
vi.mock("@/app/components/homePage/statsComponent", () => ({
  default: ({ total, title }: { total: React.ReactNode; title: string }) => (
    <div>
      {total} {title}
    </div>
  ),
}));
vi.mock("@/app/components/homePage/ctaButton", () => ({
  default: ({ cta }: { cta: React.ReactNode }) => <button>{cta}</button>,
}));

import Stats from "../stats";

describe("Stats", () => {
  it("renders without crashing and shows stat values", () => {
    render(<Stats props={{ numPub2Ratings: 100, numPub1Ratings: 200, numUsers: 50 }} />);
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it("shows the CTA button", () => {
    render(<Stats props={{ numPub2Ratings: 0, numPub1Ratings: 0, numUsers: 0 }} />);
    expect(screen.getByText("Start Rating")).toBeInTheDocument();
  });
});
