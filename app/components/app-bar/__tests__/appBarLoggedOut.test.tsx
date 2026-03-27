import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import AppBarLoggedOut from "../appBarLoggedOut";

describe("AppBarLoggedOut", () => {
  it("renders without crashing and shows the brand name", () => {
    render(<AppBarLoggedOut />);
    expect(screen.getAllByText("Headline Fights").length).toBeGreaterThan(0);
  });

  it("shows Login and Signup nav links", () => {
    render(<AppBarLoggedOut />);
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Signup").length).toBeGreaterThan(0);
  });

  it("opens the mobile menu when the hamburger icon is clicked", () => {
    render(<AppBarLoggedOut />);
    const menuButton = screen.getByLabelText("account of current user");
    fireEvent.click(menuButton);
    // Menu items become visible
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
  });
});
