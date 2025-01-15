import Image from "next/image";
import { useTranslations } from "next-intl";
import { AdvantageCard } from "./advantage-card";
import headerLogotype from "~/public/img/logotypes/header-logotype.svg";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export function Advantages() {
  const t = useTranslations("b2b");

  return (
    <section className={container()}>
      <Image
        className={css({
          marginInline: "auto",
          maxWidth: "28",
          md: { maxWidth: "40" },
        })}
        src={headerLogotype.src}
        alt=""
        width="163"
        height="60"
        priority
        unoptimized
      />
      <h2
        className={css({
          textAlign: "center",
          fontSize: "lg",
          fontWeight: "900",
          paddingBlockStart: "4",
          paddingBlockEnd: "6",
          md: {
            fontSize: "4xl",
            paddingBlockEnd: "10",
          },
        })}
      >
        {t("advantages_title")}
      </h2>
      <ul
        className={css({
          display: "flex",
          gap: "2",
          flexWrap: "wrap",
          justifyContent: "space-between",
          md: { gap: "4" },
        })}
      >
        <AdvantageCard type="new-clients" />
        <AdvantageCard type="bookings-management" />
        <AdvantageCard type="dead-hours" />
      </ul>
    </section>
  );
}
