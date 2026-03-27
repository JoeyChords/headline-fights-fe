import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/image");
vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import AppBarLoggedIn from "../appBarLoggedIn";

describe("AppBarLoggedIn", () => {
  it("renders without crashing and shows the brand name", () => {
    render(<AppBarLoggedIn />);
    expect(screen.getAllByText("Headline Fights").length).toBeGreaterThan(0);
  });

  it("shows the user's initial in the avatar", () => {
    render(<AppBarLoggedIn name="alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("opens the settings menu when the avatar is clicked", () => {
    render(<AppBarLoggedIn name="alice" />);
    fireEvent.click(screen.getByRole("button", { name: /open settings/i }));
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("shows the user name in the menu", () => {
    render(<AppBarLoggedIn name="alice" />);
    fireEvent.click(screen.getByRole("button", { name: /open settings/i }));
    expect(screen.getByText("alice")).toBeInTheDocument();
  });
});
