import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import AppBarHomePage from "../appBarHomePage";

describe("AppBarHomePage", () => {
  it("renders without crashing and shows the brand name", () => {
    render(<AppBarHomePage />);
    expect(screen.getAllByText("Headline Fights").length).toBeGreaterThan(0);
  });

  it("shows Login and Signup nav links", () => {
    render(<AppBarHomePage />);
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Signup").length).toBeGreaterThan(0);
  });
});
