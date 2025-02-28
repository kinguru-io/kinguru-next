import Image from "next/image";
import { useTranslations } from "next-intl";
import { B2BRegisterForm } from "./b2b-register-form";
import { Icon } from "@/components/uikit";
import { companySignUpFromUntaxed } from "@/lib/actions";

import footerLogo from "~/public/img/logotypes/footer-logotype.svg";
import { css } from "~/styled-system/css";
import { Flex, Stack } from "~/styled-system/jsx";
import { container, hstack } from "~/styled-system/patterns";

export function B2BRegisterSection({ sectionId }: { sectionId: string }) {
  const t = useTranslations("b2b");
  const alt = useTranslations("alt_images");
  return (
    <section id={sectionId} className={container()}>
      <Stack
        css={{
          gap: "5",
          bgColor: "dark",
          padding: "6",
          borderRadius: "2xl",
          md: {
            gap: "6",
            padding: "16",
            borderRadius: "3xl",
          },
        }}
      >
        <h2
          className={hstack({
            color: "light",
            fontWeight: "700",
            fontSize: "2xl",
            gap: "4",
            md: {
              fontSize: "3xl",
            },
          })}
        >
          <Image
            className={css({ display: "none", md: { display: "block" } })}
            alt={alt("b2b_register")}
            src={footerLogo.src}
            width={52}
            height={52}
          />
          {t("register_title")}
        </h2>
        <Bonuses />
        <B2BRegisterForm signUp={companySignUpFromUntaxed} />
      </Stack>
    </section>
  );
}

export function Bonuses() {
  const t = useTranslations("b2b.register_bonuses");

  const count = parseInt(t("count"));

  if (!count) return null;

  return (
    <Stack css={{ gap: "2" }}>
      {Array.from({ length: count }, (_, idx) => {
        // @ts-expect-error
        const text = t(`bonus.${idx + 1}`);

        return (
          <Flex
            key={idx}
            css={{
              color: "light",
              gap: "2",
              fontSize: "sm",
              md: { fontSize: "px15" },
            }}
          >
            <Icon
              name="action/tick"
              className={css({
                flexShrink: "0",
                bgColor: "primary",
                borderRadius: "full",
                padding: "0.5",
                fontSize: "xs",
                color: "dark",
              })}
            />
            {text}
          </Flex>
        );
      })}
    </Stack>
  );
}
