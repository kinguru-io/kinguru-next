"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { Center } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export function MapSearchLink() {
  const t = useTranslations("search_map");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = new URLSearchParams(searchParams);
  const maybePremiseType = pathname.replace(/\/premises\/?/, "");

  if (maybePremiseType) {
    search.append("type", maybePremiseType);
  }

  return (
    <Center
      style={{
        backgroundImage:
          "url(https://kinguru-storage.s3.pl-waw.scw.cloud/premises/static/map-bg.jpg)",
      }}
      css={{
        position: "relative",
        minHeight: "32",
        padding: "4",
        marginBlockEnd: "5",
        boxShadow: "map-link",
        borderRadius: "lg",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPosition: "center",
        bgColor: "secondary.lighter",
        lg: { minHeight: "52" },
      }}
    >
      <Link
        className={cx(
          button({ colorPalette: "dark" }),
          css({
            position: "static",
            boxShadow: "cardShadow",
            _before: {
              content: '""',
              position: "absolute",
              inset: "0",
            },
          }),
        )}
        href={`/premises/map-search?${search.toString()}`}
        prefetch={false}
      >
        {t("show_map")}
      </Link>
    </Center>
  );
}
