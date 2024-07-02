"use client";

import type { UrlObject } from "url";
import type { $Enums } from "@prisma/client";
import { useSelectedLayoutSegment } from "next/navigation";
import { type NestedKeyOf, useTranslations } from "next-intl";
import { useModal } from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

type NavLink = {
  href: string | UrlObject;
  labelIntlCode: NestedKeyOf<IntlMessages["profile"]["link_labels"]>;
  segment: string;
};

const profileLinksMap: Record<$Enums.UserRole, readonly NavLink[]> = {
  user: [
    {
      href: "/profile/edit",
      labelIntlCode: "edit",
      segment: "edit",
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
  ],
  organization: [
    {
      href: "/profile/edit",
      labelIntlCode: "edit",
      segment: "edit",
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
  ],
  admin: [],
};

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

export function ProfileNavigation({
  menuLabel,
  role,
}: {
  menuLabel: string;
  role: $Enums.UserRole;
}) {
  const { setOpen } = useModal();
  const t = useTranslations("profile.link_labels");
  const segment = useSelectedLayoutSegment() || "edit";

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
        {profileLinksMap[role].map((navItem) => {
          const isActive = navItem.segment === segment;

          return (
            <Link
              key={navItem.segment}
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
