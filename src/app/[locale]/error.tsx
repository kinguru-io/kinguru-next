"use client";

import { useTranslations, type RichTranslationValues } from "next-intl";
import { GoBackButton } from "@/components/common";
import { ArrowIcon, Button } from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { Container, VStack } from "~/styled-system/jsx";
import { hstack } from "~/styled-system/patterns";

const helperRich: RichTranslationValues = {
  mail: (mail) => <a href={`mailto:${mail}`}>{mail}</a>,
};

export default function MainErrorPage({
  reset,
  error,
}: {
  reset: () => void;
  error: Error & { digest?: string };
}) {
  const t = useTranslations("error_page");

  return (
    <Container>
      <VStack gap="6" height="full" paddingBlock="8">
        <GoBackButton
          label={t("go_back")}
          marginBlockEnd={undefined}
          alignSelf="flex-start"
          renderAlways
        />
        <h2
          className={css({
            fontSize: "3xl",
            fontWeight: "medium",
          })}
        >
          {t("heading")}
        </h2>
        <p
          className={css({
            fontSize: "sm",
            "& > a": {
              padding: "1",
              fontWeight: "bold",
              _hoverOrFocusVisible: { textDecoration: "underline" },
            },
          })}
        >
          {t.rich("helper", helperRich)}
        </p>
        <Button onClick={() => reset()}>{t("retry_label")}</Button>
        <Link
          href="/"
          className={hstack({
            gap: "1",
            padding: "1",
            fontSize: "sm",
            _hoverOrFocusVisible: { textDecoration: "underline" },
          })}
        >
          {t("homepage_label")}
          <ArrowIcon direction="right" />
        </Link>
        {error.digest && (
          <span
            className={css({
              fontSize: "xs",
              color: "secondary",
              marginBlockStart: "4",
            })}
          >
            {error.digest}
          </span>
        )}
      </VStack>
    </Container>
  );
}
