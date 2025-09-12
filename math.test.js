// math.test.js
import { subtract, multiply, divide } from './math.js';

describe("subtract()", () => {
  test("5 - 3 = 2", () => expect(subtract(5, 3)).toBe(2));
  test("0 - 0 = 0", () => expect(subtract(0, 0)).toBe(0));
  test("5 - (-5) = 10", () => expect(subtract(5, -5)).toBe(10));
  test("-5 - (-5) = 0", () => expect(subtract(-5, -5)).toBe(0));
  test("0 - 10 = -10", () => expect(subtract(0, 10)).toBe(-10));
});

describe("multiply()", () => {
  test("2 * 3 = 6", () => expect(multiply(2, 3)).toBe(6));
  test("0 * 100 = 0", () => expect(multiply(0, 100)).toBe(0));
  test("(-2) * 5 = -10", () => expect(multiply(-2, 5)).toBe(-10));
  test("(-3) * (-3) = 9", () => expect(multiply(-3, -3)).toBe(9));
  test("2.5 * 4 = 10", () => expect(multiply(2.5, 4)).toBe(10));
});

describe("divide()", () => {
  test("10 / 2 = 5", () => expect(divide(10, 2)).toBe(5));
  test("0 / 1 = 0", () => expect(divide(0, 1)).toBe(0));
  test("10 / -2 = -5", () => expect(divide(10, -2)).toBe(-5));
  test("-10 / -2 = 5", () => expect(divide(-10, -2)).toBe(5));
  test("7 / 2 = 3.5", () => expect(divide(7, 2)).toBe(3.5));
});
