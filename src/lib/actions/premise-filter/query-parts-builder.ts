import { isValid } from "date-fns";
import { boundingBoxResolver } from "./resolvers/bbox-resolver";
import {
  availableDayResolver,
  closedHoursResolver,
  premiseSlotResolver,
} from "./resolvers/search-datetime";
import { filterKeysResolverMap, isFilterKey } from "./resolvers/simple-keys";

const premisePredicate = { term: { booked_slots: "premise" } } as const; // only Premise documents matter
export const defaultSizings = {
  size: 10,
  from: 0,
};

export function buildQueryParts(searchParams: Record<string, any>) {
  return Object.entries(searchParams).reduce<
    Record<"must" | "must_not" | "sort" | "size", any>
  >(
    (parts, [key, values]) => {
      if (!values) return parts;

      if (isFilterKey(key)) {
        const resolver = filterKeysResolverMap[key];
        parts.must.push(resolver(values));
      }

      if (key === "sort") {
        parts.sort.push({ minPrice: values });
      }

      if (key === "size") {
        parts.size = Number(values);
      }

      if (key === "search_datetime") {
        const isoRanges: string[] = values.split(",");
        if (isoRanges.some((range) => !isValid(new Date(range)))) return parts;

        parts.must.push(availableDayResolver(isoRanges[0]));
        parts.must_not.push(
          premiseSlotResolver(isoRanges),
          closedHoursResolver(isoRanges),
        );
      }

      if (key === "bbox") {
        if (typeof values !== "string") return parts;

        const points = values
          .split(",")
          .map((stringPoint) => Number(stringPoint));

        if (
          points.length !== 4 ||
          points.some((point) => Number.isNaN(point))
        ) {
          return parts;
        }

        parts.must.push(boundingBoxResolver(points));
      }

      return parts;
    },
    {
      must: [premisePredicate],
      must_not: [],
      sort: [],
      size: defaultSizings.size,
    },
  );
}
