import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HowItWorksComponent from "../howItWorksComponent";

describe("HowItWorksComponent", () => {
  it("renders title and explanation", () => {
    render(<HowItWorksComponent title="1." explanation="We show you a headline." />);
    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("We show you a headline.")).toBeInTheDocument();
  });
});
