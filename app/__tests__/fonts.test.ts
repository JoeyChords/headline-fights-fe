import { describe, expect, it } from "vitest";
import { inter, black_ops_one } from "../fonts";

describe("fonts", () => {
  it("exports inter with a className string", () => {
    expect(typeof inter.className).toBe("string");
  });

  it("exports black_ops_one with the correct font family style", () => {
    expect(black_ops_one.style.fontFamily).toBe('"Black Ops One", cursive');
  });
});
