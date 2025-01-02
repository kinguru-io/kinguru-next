"use client";

import { ArrowIcon } from "@/components/uikit";
import { Link, usePathname } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

const buttonClassName = cx(
  button({
    colorPalette: "secondary",
    centered: true,
    size: { base: "sm", md: "lg" },
  }),
  css({ marginBlockStart: { base: "5", md: "10" } }),
);

export function LoadMoreLink({
  take,
  initialSize,
  total,
  searchParams,
  label,
}: {
  take: number;
  initialSize: number;
  total: number;
  searchParams: Record<string, any>;
  label: string;
}) {
  const pathname = usePathname();

  const currentSize = searchParams?.size
    ? Number(searchParams.size)
    : initialSize;

  if (currentSize >= total) return null;

  return (
    <Link
      className={buttonClassName}
      href={{ pathname, query: { ...searchParams, size: currentSize + take } }}
      scroll={false}
    >
      {label}
      <ArrowIcon direction="down" />
    </Link>
  );
}
