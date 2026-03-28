import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HowItWorksBox from "../howItWorksBox";

describe("HowItWorksBox", () => {
  it("renders the icon and component props", () => {
    render(<HowItWorksBox icon={<span>🔍</span>} component={<span>Step text</span>} />);
    expect(screen.getByText("Step text")).toBeInTheDocument();
  });
});
