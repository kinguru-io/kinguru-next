"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

const navigationClassName = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2",
  marginBlockStart: "2",
  "& > a": {
    justifyContent: "center",
    flexBasis: "40",
    flexGrow: "1",
    "&[aria-current=page]": {
      bgColor: { base: "primary", _hover: "dark" },
    },
  },
});
const linkClassName = button({ rounded: false, colorPalette: "secondary" });

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const t = useTranslations("auth");

  return (
    <>
      <div>
        {t("profile_type")}
        <nav className={navigationClassName}>
          <Link
            href="/auth/signin/user"
            className={linkClassName}
            aria-current={segment !== "company" && "page"}
          >
            {t("type_user")}
          </Link>
          <Link
            href="/auth/signin/company"
            className={linkClassName}
            aria-current={segment === "company" && "page"}
          >
            {t("type_company")}
          </Link>
        </nav>
      </div>
      <h1>{t("sign_in_heading")}</h1>
      {children}
      {/* <Link
        href="/auth/reset"
        className={css({
          padding: "1",
          alignSelf: "center",
          fontSize: "xs",
          _hoverOrFocusVisible: { textDecoration: "underline" },
        })}
      >
        {t("reset_password_label")}
      </Link> */}
    </>
  );
}
