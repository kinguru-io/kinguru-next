import { expect, it, describe } from "vitest";
import { prepareDiscountRangeMap } from "./discounts";

describe("prepareDiscountRangeMap", () => {
  it("single discount", () => {
    expect(
      prepareDiscountRangeMap([
        {
          duration: 3,
          discountPercentage: 50,
          id: "1",
          premiseId: "1",
        },
      ]),
    ).toEqual({ "3": 50 });
  });

  it("two discounts", () => {
    expect(
      prepareDiscountRangeMap([
        {
          duration: 3,
          discountPercentage: 10,
          id: "1",
          premiseId: "1",
        },
        {
          duration: 6,
          discountPercentage: 30,
          id: "1",
          premiseId: "1",
        },
      ]),
    ).toEqual({ 3: 10, 4: 10, 5: 10, 6: 30 });
  });
});
