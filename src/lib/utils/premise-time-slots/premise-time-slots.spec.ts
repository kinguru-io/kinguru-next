import { expect, it, describe } from "vitest";
import { eachHourStampOfInterval, generateTimeSlots } from "./time-slots";

describe("generateTimeSlots", () => {
  it("any input", () => {
    expect(
      generateTimeSlots({
        id: "1",
        premiseId: "1",
        day: "MONDAY",
        price: 100,
        openTime: 1000,
        closeTime: 1500,
      }),
    ).toEqual({
      day: "MONDAY",
      timeSlots: [
        { price: 100, time: 1000 },
        { price: 100, time: 1100 },
        { price: 100, time: 1200 },
        { price: 100, time: 1300 },
        { price: 100, time: 1400 },
      ],
    });
  });
});

describe("eachHourStampOfInterval", () => {
  it("1000, 1500, step 100", () => {
    expect(eachHourStampOfInterval(1000, 1500, 100)).toEqual([
      1000, 1100, 1200, 1300, 1400, 1500,
    ]);
  });
});
