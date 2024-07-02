"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { type NestedKeyOf, useTranslations } from "next-intl";
import { useModal } from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

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

const navigationClassName = css({
  display: "flex",
  flexDirection: "column",
  gap: "4",
  lineHeight: "1",
  fontSize: "xl",
  md: { gap: "1", fontSize: "px15" },
  "& > a": {
    padding: "1",
    borderRadius: "sm",
    _currentPage: { fontWeight: "bold", fontSize: "2xl" },
    md: {
      paddingBlock: "3",
      paddingInline: "4",
      bgColor: "secondary.lighter",
      _currentPage: {
        bgColor: "primary",
        fontWeight: "inherit",
        fontSize: "inherit",
      },
    },
  },
});

export function ProfileNavigation({ menuLabel }: { menuLabel: string }) {
  const { setOpen } = useModal();
  const t = useTranslations("profile.link_labels");
  // no segment = null = main profile mage
  const segment = useSelectedLayoutSegment() || "";

  return (
    <Stack
      css={{
        gap: "8",
        paddingBlock: "4",
        md: {
          paddingBlock: "6",
          paddingInline: "4",
          height: "fit-content",
          bgColor: "light",
          gap: "4",
        },
      }}
    >
      <span
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
          lineHeight: "1",
          md: { fontSize: "xl" },
        })}
      >
        {menuLabel}
      </span>
      <nav onClick={() => setOpen(false)} className={navigationClassName}>
        {profileNavLinks.map((navItem) => {
          const isActive = navItem.segment === segment;

          return (
            <Link
              key={navItem.href}
              href={navItem.href}
              aria-current={isActive ? "page" : "false"}
            >
              {t(navItem.labelIntlCode)}
            </Link>
          );
        })}
      </nav>
    </Stack>
  );
}
