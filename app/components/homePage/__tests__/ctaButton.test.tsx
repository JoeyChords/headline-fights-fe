import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import CTAButton from "../ctaButton";

describe("CTAButton", () => {
  it("renders with the cta text", () => {
    render(<CTAButton cta="Start Rating" />);
    expect(screen.getByRole("link", { name: "Start Rating" })).toBeInTheDocument();
  });
});
