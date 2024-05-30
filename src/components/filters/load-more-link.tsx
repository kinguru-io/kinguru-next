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
    button({ size: "md", centered: true }),
    css({ marginBlockStart: "30px", alignItems: "baseline" }),
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
