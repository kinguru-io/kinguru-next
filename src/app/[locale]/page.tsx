import { getTranslations } from "next-intl/server";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import { PremiseStack } from "@/components/premise";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export default async function RootPage() {
  const t = await getTranslations("main");
  const premiseIdList = await prisma.premise.findMany({
    select: { id: true },
    orderBy: { updatedAt: "desc" },
    take: 4,
  });

  return (
    <>
      <TimeRangeHero heading={t("heading")}>
        <TimeRangeLink
          pathname="/premises"
          flushBefore={["sort", "size"]}
          name="search_datetime"
        />
      </TimeRangeHero>
      <section className={container({ marginBlock: "8" })}>
        <h2
          className={css({
            textStyle: "heading.section",
            marginBlockEnd: { base: "6", md: "8" },
          })}
        >
          {t("heading_popular")}
        </h2>
        <PremiseStack premiseIdList={premiseIdList} />
        <Link
          className={cx(
            css({
              marginBlock: { base: "10", md: "13" },
              width: "max-content",
            }),
            button({
              size: "lg",
              colorPalette: "secondary",
              centered: true,
            }),
          )}
          href="/premises"
        >
          {t("show_more")}
        </Link>
      </section>
    </>
  );
}
