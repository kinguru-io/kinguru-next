"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/uikit";
import { Link } from "@/navigation";
import { button } from "~/styled-system/recipes";

export function CompanyRegisterLink() {
  const t = useTranslations("navbar");
  const { setOpen } = useModal();

  return (
    <Link
      className={button({ contentCentered: true })}
      href="/auth/signup/company"
      onClick={() => setOpen(false)}
    >
      {t("add_venue")}
    </Link>
  );
}
