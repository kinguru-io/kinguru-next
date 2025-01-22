import Image from "next/image";
import { useTranslations } from "next-intl";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export function CompaniesSection() {
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
        {t("companies_title")}
      </h2>
      <CompaniesList />
    </section>
  );
}

function CompaniesList() {
  const t = useTranslations("company_logo");

  const count = parseInt(t("count"));

  if (!count) return null;

  return (
    <ul
      className={css({
        paddingBlockStart: "8",
        display: "flex",
        gap: "4",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        md: {
          paddingBlockStart: "10",
        },
      })}
    >
      {Array.from({ length: count }, (_, idx) => {
        // @ts-expect-error
        const src = t(`urls.${idx + 1}`);

        return (
          <li
            key={idx}
            className={css({
              listStyle: "none",
              flexBasis: "20",
              md: { flexBasis: "28" },
              filter: "saturate(0) opacity(0.7)",
              transition: { base: "filter 250ms", _motionReduce: "none" },
              _hover: {
                filter: "none",
              },
            })}
          >
            <Image
              unoptimized
              className={css({
                display: "block",
                objectFit: "contain",
                width: "full",
                height: "full",
              })}
              alt=""
              src={src}
              width={112}
              height={112}
            />
          </li>
        );
      })}
    </ul>
  );
}
