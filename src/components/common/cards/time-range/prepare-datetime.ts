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
  const defaultConfig = {
    from: "",
    to: "",
    date: null,
  };

  if (!searchParams) return defaultConfig;

  const datetimeParam = searchParams.get(name);

  if (!datetimeParam) return defaultConfig;

  const [from, to] = datetimeParam.split(",");

  return {
    from: getHours(from).toString(),
    to: getHours(to).toString(),
    date: new Date(from),
  };
}
