import { useTranslations } from "next-intl";
import { css } from "~/styled-system/css";

export function AdvantageCard({
  type,
}: {
  type: "new-clients" | "bookings-management" | "dead-hours";
}) {
  const t = useTranslations("b2b.advantages");

  return (
    <li
      style={{
        backgroundImage: `url(https://kinguru-storage.s3.pl-waw.scw.cloud/marketing/advantages/${type}.png)`,
      }}
      className={css({
        minWidth: "56",
        flex: "1",
        borderRadius: "3xl",
        listStyle: "none",
        minHeight: "44",
        padding: "6",
        bgColor: "secondary.lighter",
        bgPosition: "100% 100%",
        bgSize: "130px",
        bgRepeat: "no-repeat",
        md: { minHeight: "80", padding: 8, minWidth: "72", bgSize: "210px" },
      })}
    >
      <span
        className={css({
          display: "block",
          fontWeight: "600",
          maxWidth: "56",
          md: { maxWidth: "72", fontSize: "xl" },
        })}
      >
        {t(type)}
      </span>
    </li>
  );
}
