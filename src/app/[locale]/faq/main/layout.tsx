"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FAQLink, faqLinks } from "./faq-links";
import { css } from "~/styled-system/css";
import { Container, Stack } from "~/styled-system/jsx";

const navigationClassName = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  fontSize: "px15",
  lineHeight: "1",
  "& > a": {
    borderRadius: "sm",
    paddingBlock: "3",
    paddingInline: "4",
    bgColor: "secondary.lighter",
    _currentPage: {
      bgColor: "primary",
      fontWeight: "bold",
    },
  },
});

const listClassName = css({
  display: "flex",
  flexDirection: "column",
  gap: "12",
  paddingInline: "6",
  fontSize: "lg",
  "& > li": {
    listStyleType: "decimal",
  },
  "& .faq-image": {
    objectFit: "contain",
  },
  "& .anchor": {
    color: "secondary",
    textDecoration: "underline",
    _hoverOrFocusVisible: { textDecoration: "none" },
  },
});

export default function FAQMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment =
    (useSelectedLayoutSegment() as FAQLink["labelIntlCode"]) ||
    faqLinks.at(0)?.segment;
  const t = useTranslations("faq.main.pages");

  return (
    <Container paddingBlock="8">
      <Stack gap="12">
        <nav className={navigationClassName}>
          {faqLinks.map((link) => {
            const isActive = link.segment === segment;

            return (
              <Link
                href={link.href}
                key={link.segment}
                aria-current={isActive ? "page" : "false"}
              >
                {t(link.labelIntlCode)}
              </Link>
            );
          })}
        </nav>
        <h1 className={css({ fontSize: "3xl", fontWeight: "bold" })}>
          {t(segment)}
        </h1>
        <ol className={listClassName}>{children}</ol>
      </Stack>
    </Container>
  );
}
