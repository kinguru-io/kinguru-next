import { expect, it, describe } from "vitest";
import { prepareClosedHours } from "./prepare-closed-hours";

describe("[consumer] prepareClosedHours", () => {
  it("Monday, 2:00 - 21:00", () => {
    expect(
      prepareClosedHours({
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

  it("Monday, 2:00 - 14:00, 15:00 - 21:00", () => {
    expect(
      prepareClosedHours({
        openHours: [
          {
            day: "MONDAY",
            openTime: new Date("1970-01-01T02:00:00.000Z"),
            closeTime: new Date("1970-01-01T14:00:00.000Z"),
          },
          {
            day: "MONDAY",
            openTime: new Date("1970-01-01T15:00:00.000Z"),
            closeTime: new Date("1970-01-01T21:00:00.000Z"),
          },
        ],
      }),
    ).toEqual({ 1: [0, 1, 14, 21, 22, 23, 24] });
  });

  it("Sunday key should be 7", () => {
    const result = prepareClosedHours({
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

  it("Working hours 24/7", () => {
    const result = prepareClosedHours({
      openHours: [
        {
          day: "MONDAY",
          openTime: new Date("1970-01-01T00:00:00.000Z"),
          closeTime: new Date("1970-01-01T24:00:00.000Z"),
        },
      ],
    });

    expect(result["1"]).toEqual([-1]);
  });

  it("Working hours till 00:00", () => {
    const result = prepareClosedHours({
      openHours: [
        {
          day: "MONDAY",
          openTime: new Date("1970-01-01T06:00:00.000Z"),
          closeTime: new Date("1970-01-01T24:00:00.000Z"),
        },
      ],
    });

    expect(result["1"]).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
