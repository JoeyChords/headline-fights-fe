import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/app/components/homePage/howItWorksBox", () => ({
  default: ({ component }: { component: React.ReactNode }) => <div>{component}</div>,
}));
vi.mock("@/app/components/homePage/howItWorksComponent", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));
vi.mock("@/app/components/homePage/ctaButton", () => ({
  default: ({ cta }: { cta: React.ReactNode }) => <button>{cta}</button>,
}));

import HowItWorks from "../howItWorks";

describe("HowItWorks", () => {
  it("renders without crashing and shows section heading", () => {
    render(<HowItWorks />);
    expect(screen.getByText("How Rating Works")).toBeInTheDocument();
  });

  it("shows the four steps", () => {
    render(<HowItWorks />);
    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("2.")).toBeInTheDocument();
    expect(screen.getByText("3.")).toBeInTheDocument();
    expect(screen.getByText("4.")).toBeInTheDocument();
  });
});
