import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import Footer from "../footer";

describe("homePage/Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("Headline Fights")).toBeInTheDocument();
  });

  it("shows navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("shows the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});
