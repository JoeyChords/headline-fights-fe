import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import Footer from "../footer";

describe("Footer", () => {
  beforeEach(() => {
    Object.defineProperty(window, "screen", {
      value: { orientation: { addEventListener: vi.fn(), removeEventListener: vi.fn() } },
      writable: true,
    });
  });
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("Headline Fights")).toBeInTheDocument();
  });

  it("shows key navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("shows the copyright notice with the © symbol", () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});
