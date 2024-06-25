import { expect, it, describe } from "vitest";
import { prepareClosedHours } from "./prepare-closed-hours";

describe("consumer. prepare ES closed hours", () => {
  it("any input", () => {
    expect(
      prepareClosedHours({
        timeZone: "UTC",
        openHours: [
          {
            day: "MONDAY",
            openTime: new Date("1970-01-01T02:00:00.000Z"),
            closeTime: new Date("1970-01-01T21:00:00.000Z"),
          },
        ],
      }),
    ).toEqual({ 1: [0, 1, 21, 22, 23, 24] });
  });

  it("Sunday key should be '7'", () => {
    const result = prepareClosedHours({
      timeZone: "UTC",
      openHours: [
        {
          day: "SUNDAY",
          openTime: new Date("1970-01-01T02:00:00.000Z"),
          closeTime: new Date("1970-01-01T21:00:00.000Z"),
        },
      ],
    });

    expect(result).toHaveProperty("7");
  });
});
