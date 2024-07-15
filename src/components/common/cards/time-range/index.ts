import dynamic from "next/dynamic";

export { TimeRangeHero } from "./hero-wrapper";
export const TimeRangeLink = dynamic(() =>
  import("./time-range-link").then((m) => m.TimeRangeLink),
);
