import { format } from "date-fns";

export const formatDate = (date: string | null): string | null => {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return null;

  return format(parsedDate, "dd.MM.yyyy");
};
