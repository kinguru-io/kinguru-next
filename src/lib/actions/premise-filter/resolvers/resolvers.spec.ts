import { describe, expect, it } from "vitest";
import { closedHoursResolver } from "./search-datetime";

const from = "2024-07-18T10:00:00.000Z";
const to = "2024-07-18T12:00:00.000Z";
const fromDate = new Date(from);
const docNumber = fromDate.getDay() === 0 ? 7 : fromDate.getDay();

describe("[search-datetime] closedHoursResolver", () => {
  it(`10:00 - 12:00, ${docNumber}`, () => {
    expect(closedHoursResolver([from, to])).to.toEqual({
      terms: { [`closedHours.${docNumber}`]: [10, 11] },
    });
  });
});
