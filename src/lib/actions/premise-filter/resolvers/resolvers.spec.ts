import { describe, expect, it } from "vitest";
import { closedHoursResolver, premiseSlotResolver } from "./search-datetime";

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

describe("[search-datetime] premiseSlotResolver", () => {
  it("Slot containment 11:00 - 12:00", () => {
    const mustArray = premiseSlotResolver([
      "2024-07-21T11:00:00.000Z",
      "2024-07-21T12:00:00.000Z",
    ]).has_child.query.bool.must;

    expect(mustArray).toContainEqual({
      range: { startTime: { lt: "2024-07-21T12:00:00.000Z" } },
    });

    expect(mustArray).toContainEqual({
      range: { endTime: { gt: "2024-07-21T11:00:00.000Z" } },
    });
  });
});
