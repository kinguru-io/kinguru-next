import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemToggle,
} from "@/components/uikit";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export function B2BFaq() {
  const t = useTranslations("b2b");

  return (
    <section className={container()}>
      <h2
        className={css({
          fontWeight: "900",
          fontSize: "2xl",
          md: {
            fontSize: "3xl",
          },
        })}
      >
        {t("faq_title")}
      </h2>
      <B2BFaqAccordions />
    </section>
  );
}

function B2BFaqAccordions() {
  const t = useTranslations("b2b.faq");

  const count = parseInt(t("count"));

  if (!count) return null;

  return (
    <Accordion css={{ paddingBlockStart: "6", md: { paddingBlockStart: "8" } }}>
      {Array.from({ length: count }, (_, idx) => {
        // @ts-expect-error
        const title = t(`questions.${idx + 1}.title`);
        // @ts-expect-error
        const content = t(`questions.${idx + 1}.content`);

        return (
          <AccordionItem key={idx}>
            <AccordionItemToggle
              css={{
                fontSize: "px15",
                fontWeight: "bold",
                borderRadius: "sm",
                _peerChecked: { bgColor: "primary" },
                md: { padding: "6", fontSize: "md" },
              }}
            >
              {title}
            </AccordionItemToggle>
            <AccordionItemContent
              className={css({
                padding: "4",
                fontSize: "sm",
                md: { paddingInline: "6", fontSize: "px15" },
                whiteSpace: "pre-line",
              })}
            >
              {content}
            </AccordionItemContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
