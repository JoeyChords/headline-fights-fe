import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@mui/x-charts/BarChart", () => ({
  BarChart: ({ dataset }: { dataset: unknown[] }) => <div data-testid="bar-chart">rows:{dataset.length}</div>,
}));

import GuessAccuracyChart from "../guessAccuracyChart";

const dataset = [
  { publication: "CNN", you: 60, crowd: 55 },
  { publication: "Fox News", you: 40, crowd: 45 },
];

describe("dashboard/GuessAccuracyChart", () => {
  it("renders without crashing and passes dataset to chart", () => {
    render(<GuessAccuracyChart dataset={dataset} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByText("rows:2")).toBeInTheDocument();
  });
});
