"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { type NestedKeyOf, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

type NavLink = {
  href: string;
  labelIntlCode: NestedKeyOf<IntlMessages["profile"]["link_labels"]>;
  segment: string;
};

// TODO add an access by a role
const profileNavLinks: readonly NavLink[] = [
  {
    href: "/profile",
    labelIntlCode: "main",
    segment: "",
  },
  {
    href: "/profile/edit",
    labelIntlCode: "edit",
    segment: "edit",
  },
  {
    href: "/profile/events",
    labelIntlCode: "events",
    segment: "events",
  },
  {
    href: "/profile/venues",
    labelIntlCode: "venues",
    segment: "venues",
  },
  {
    href: "/profile/notifications",
    labelIntlCode: "notifications",
    segment: "notifications",
  },
  {
    href: "/profile/settings",
    labelIntlCode: "settings",
    segment: "settings",
  },
] as NavLink[];

export function ProfileNavigation() {
  const t = useTranslations("profile.link_labels");
  const selectedSegment = useSelectedLayoutSegment() || "";

  return (
    <nav
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        height: "fit-content",
        position: "sticky",
        top: "100px", // header height + 15px
        marginBlockStart: "130px", // 200px = 130px + layout padding
      })}
    >
      {profileNavLinks.map((navItem) => {
        const isActive = navItem.segment === selectedSegment;

        return (
          <Link
            key={navItem.href}
            href={navItem.href}
            className={cx(
              button({ variant: isActive ? "solid" : "ghost" }),
              css({
                colorPalette: "primary",
                textStyle: "body.2",
                fontWeight: "normal",
                flexBasis: "full",
                borderLeftRadius: "0",
                paddingInlineStart: "60px",
              }),
            )}
          >
            {t(navItem.labelIntlCode)}
          </Link>
        );
      })}
    </nav>
  );
}
