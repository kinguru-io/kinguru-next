import { isValid } from "date-fns";
import type { ReadonlyURLSearchParams } from "next/navigation";

export function prepareDatetimeParam(date: string, from: number, to: number) {
  const fromDate = new Date(date);
  fromDate.setUTCHours(from, 0, 0, 0);
  const toDate = new Date(date);
  toDate.setUTCHours(to, 0, 0, 0);

  return `${fromDate.toISOString()},${toDate.toISOString()}`;
}

const initialValues = {
  from: "",
  to: "",
  date: null,
};

export function parseInitialDatetimeValues({
  searchParams,
  name,
}: {
  searchParams: ReadonlyURLSearchParams | null;
  name: string;
}) {
  if (!searchParams) return initialValues;

  const datetimeParam = searchParams.get(name);

  if (!datetimeParam) return initialValues;

  const [from, to] = datetimeParam.split(",").map((date) => new Date(date));

  if (!isValid(from) || !isValid(to)) return initialValues;

  return {
    from: new Date(from).getUTCHours().toString(),
    to: new Date(to).getUTCHours().toString(),
    date: new Date(from),
  };
}
