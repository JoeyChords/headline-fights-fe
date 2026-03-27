import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import AppBarLoginPage from "../appBarLoginPage";

describe("AppBarLoginPage", () => {
  it("renders without crashing and shows the brand name", () => {
    render(<AppBarLoginPage />);
    expect(screen.getAllByText("Headline Fights").length).toBeGreaterThan(0);
  });

  it("shows a Signup link but no Login link", () => {
    render(<AppBarLoginPage />);
    expect(screen.getAllByText("Signup").length).toBeGreaterThan(0);
    expect(screen.queryByText("Login")).toBeNull();
  });
});
