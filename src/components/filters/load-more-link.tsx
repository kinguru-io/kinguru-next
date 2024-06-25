import { ArrowIcon } from "@/components/uikit";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

export function LoadMoreLink({
  take,
  initialSize,
  total,
  pathname,
  searchParams,
  label,
}: {
  take: number;
  initialSize: number;
  total: number;
  pathname: string;
  searchParams: Record<string, any>;
  label: string;
}) {
  const className = cx(
    button({
      colorPalette: "secondary",
      centered: true,
      size: { base: "sm", md: "lg" },
    }),
    css({ marginBlockStart: { base: "5", md: "10" } }),
  );

  const currentSize = searchParams?.size
    ? Number(searchParams.size)
    : initialSize;

  if (currentSize >= total) return null;

  return (
    <Link
      className={className}
      href={{ pathname, query: { ...searchParams, size: currentSize + take } }}
      scroll={false}
    >
      {label}
      <ArrowIcon direction="down" />
    </Link>
  );
}
