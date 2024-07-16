import { expect, it, describe } from "vitest";
import { prepareClosedHours } from "./prepare-closed-hours";

describe("[consumer] prepareClosedHours", () => {
  it("any input", () => {
    expect(
      prepareClosedHours({
        openHours: [
          {
            day: "MONDAY",
            openTime: 200,
            closeTime: 2100,
          },
        ],
      }),
    ).toEqual({ 1: [0, 1, 21, 22, 23, 24] });
  });

  it("Sunday key should be '7'", () => {
    const result = prepareClosedHours({
      openHours: [
        {
          day: "SUNDAY",
          openTime: 200,
          closeTime: 2100,
        },
      ],
    });

    expect(result).toHaveProperty("7");
  });
});
