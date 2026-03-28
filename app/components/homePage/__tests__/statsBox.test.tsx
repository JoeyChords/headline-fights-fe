import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import StatsBox from "../statsBox";

describe("StatsBox", () => {
  it("renders the component passed as a prop", () => {
    render(<StatsBox component={<span>42</span>} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
