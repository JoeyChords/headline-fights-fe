import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import TermsFooter from "../terms-and-privacy-footer";

describe("TermsFooter", () => {
  it("renders without crashing", () => {
    render(<TermsFooter />);
    expect(screen.getByText("Headline Fights")).toBeInTheDocument();
  });

  it("shows navigation links", () => {
    render(<TermsFooter />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });
});
