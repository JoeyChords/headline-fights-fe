import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import StatsComponent from "../statsComponent";

describe("StatsComponent", () => {
  it("renders total and title", () => {
    render(<StatsComponent total={12345} title="Headlines Rated" />);
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Headlines Rated")).toBeInTheDocument();
  });
});
