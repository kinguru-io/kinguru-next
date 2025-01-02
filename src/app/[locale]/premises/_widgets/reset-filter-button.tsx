"use client";

import { Link, usePathname } from "@/navigation";
import { button } from "~/styled-system/recipes";

export function ResetFilterButton({ label }: { label: string }) {
  const pathname = usePathname();

  return (
    <Link
      className={button({ colorPalette: "dark" })}
      href={pathname}
      prefetch={false}
      replace
    >
      {label}
    </Link>
  );
}
