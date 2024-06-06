import { formatISO, getHours, set } from "date-fns";
import type { ReadonlyURLSearchParams } from "next/navigation";

export function prepareDatetimeParam(date: Date, from: number, to: number) {
  const fromDate = set(date, { hours: from, minutes: 0, seconds: 0 });
  const toDate = set(date, { hours: to, minutes: 0, seconds: 0 });

  return `${formatISO(fromDate)},${formatISO(toDate)}`;
}

export function parseInitialDatetimeValues({
  searchParams,
  name,
}: {
  searchParams: ReadonlyURLSearchParams | null;
  name: string;
}) {
  const defaultValues = ["", ""];

  if (!searchParams) return defaultValues;

  const datetimeParam = searchParams.get(name);

  if (!datetimeParam) return defaultValues;

  return datetimeParam.split(",").map((datetime) => String(getHours(datetime)));
}
