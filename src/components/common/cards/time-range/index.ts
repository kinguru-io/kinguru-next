import { lazy } from "react";

export { TimeRangeHero } from "./hero-wrapper";
export const TimeRangeLink = lazy(async () => ({
  default: (await import("./time-range-link")).TimeRangeLink,
}));
