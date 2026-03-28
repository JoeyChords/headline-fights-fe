import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import AppBarRegisterPage from "../appBarRegisterPage";

describe("AppBarRegisterPage", () => {
  it("renders without crashing and shows the brand name", () => {
    render(<AppBarRegisterPage />);
    expect(screen.getAllByText("Headline Fights").length).toBeGreaterThan(0);
  });

  it("shows a Login link but no Signup link", () => {
    render(<AppBarRegisterPage />);
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
    expect(screen.queryByText("Signup")).toBeNull();
  });
});
