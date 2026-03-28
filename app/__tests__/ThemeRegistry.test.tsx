import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useServerInsertedHTML: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  })),
}));

vi.mock("@/app/fonts", () => ({
  black_ops_one: { style: { fontFamily: '"Black Ops One", cursive' } },
  inter: { className: "" },
}));

import ThemeRegistry from "../ThemeRegistry";

describe("ThemeRegistry", () => {
  it("renders children", () => {
    render(
      <ThemeRegistry options={{ key: "mui" }}>
        <div data-testid="child">hello</div>
      </ThemeRegistry>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
