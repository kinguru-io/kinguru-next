import { useTranslations } from "next-intl";
import { StepCard, type StepCardProps } from "./step-card";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";

export function RegistrationGuideSection({
  anchorSlot,
  locale,
}: {
  anchorSlot: React.ReactNode;
  locale: string;
}) {
  const t = useTranslations("b2b");

  const formatter = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  });

  const stepGuide: StepCardProps[] = [
    {
      step: 1,
      minutes: formatter.format(1),
      description: t("registration_guide_steps.1"),
    },
    {
      step: 2,
      minutes: formatter.format(1),
      description: t("registration_guide_steps.2"),
    },
    {
      step: 3,
      minutes: formatter.format(1),
      description: t("registration_guide_steps.3"),
    },
    {
      step: 4,
      minutes: formatter.format(2),
      description: t("registration_guide_steps.4"),
    },
  ];

  return (
    <section className={container()}>
      <h2
        className={css({
          fontWeight: "900",
          fontSize: "2xl",
          textAlign: "center",
          md: {
            fontSize: "4xl",
          },
        })}
      >
        {t("registration_guide_title")}
      </h2>
      <ul
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
          marginBlockStart: "8",
          marginBlockEnd: "10",
          md: {
            marginBlockStart: "10",
            marginBlockEnd: "16",
            flexDirection: "row",
            flexWrap: "wrap",
            "& > *": {
              flexGrow: "1",
              flexBasis: "60",
            },
          },
        })}
      >
        {stepGuide.map((props) => (
          <StepCard key={props.step} {...props} />
        ))}
      </ul>
      <Box css={{ marginInline: "auto", width: "fit-content" }}>
        {anchorSlot}
      </Box>
    </section>
  );
}
