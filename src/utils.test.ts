import { describe, expect, it } from "vitest";
import { isAdult } from "./utils.js";

describe("isAdult", () => {
  it("should return true for age 18", () => {
    expect(isAdult(18)).toBe(true);
  });

  it("should return true for ages greater than 18", () => {
    expect(isAdult(19)).toBe(true);
    expect(isAdult(25)).toBe(true);
    expect(isAdult(65)).toBe(true);
    expect(isAdult(100)).toBe(true);
  });

  it("should return false for ages less than 18", () => {
    expect(isAdult(17)).toBe(false);
    expect(isAdult(16)).toBe(false);
    expect(isAdult(10)).toBe(false);
    expect(isAdult(0)).toBe(false);
  });

  it("should handle edge case of age 0", () => {
    expect(isAdult(0)).toBe(false);
  });

  it("should handle negative ages", () => {
    expect(isAdult(-1)).toBe(false);
    expect(isAdult(-10)).toBe(false);
  });

  it("should handle decimal ages", () => {
    expect(isAdult(17.9)).toBe(false);
    expect(isAdult(18.1)).toBe(true);
  });
});
