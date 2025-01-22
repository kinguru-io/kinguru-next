import { useTranslations } from "next-intl";
import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { circle, hstack, stack } from "~/styled-system/patterns";

export type StepCardProps = {
  step: number;
  minutes: string;
  description: string;
};

export function StepCard({ step, minutes, description }: StepCardProps) {
  const t = useTranslations("b2b");

  return (
    <li
      className={css({
        listStyle: "none",
        borderRadius: "3xl",
        paddingBlockStart: "13",
        paddingBlockEnd: "6",
        paddingInline: "4",
        boxShadow: "cardLightShadow",
        bgColor: "light",
        display: "flex",
        flexDirection: "column",
        gap: "4",
        alignItems: "center",
        position: "relative",
        marginBlockStart: "10",
        md: {
          paddingBlockStart: "16",
          paddingBlockEnd: "8",
          paddingInline: "6",
        },
      })}
    >
      <span
        className={circle({
          width: "4.875rem",
          height: "4.875rem",
          bgColor: "primary",
          fontWeight: "700",
          position: "absolute",
          insetBlockStart: "calc(4.875rem / -2)",
          lineHeight: "1",
          md: {
            width: "24",
            height: "24",
            fontSize: "lg",
            insetBlockStart: "-12",
          },
        })}
      >
        {t("step_label", { step })}
      </span>
      <span className={stack({ gap: "2" })}>
        <span className={css({ color: "secondary", fontSize: "px13" })}>
          {t("required_time_time")}
          <span
            className={hstack({
              gap: "1",
              color: "dark",
              fontWeight: "700",
              fontSize: "sm",
            })}
          >
            <Icon
              name="action/tick"
              className={css({
                bgColor: "primary",
                borderRadius: "full",
                padding: "0.5",
                fontSize: "xs",
              })}
            />{" "}
            {minutes}
          </span>
        </span>
      </span>
      <span
        className={css({
          fontSize: "sm",
          lineHeight: "1.6",
          textAlign: "center",
          md: {
            fontSize: "px15",
          },
        })}
      >
        {description}
      </span>
    </li>
  );
}
