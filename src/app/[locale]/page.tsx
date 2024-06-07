import { getTranslations } from "next-intl/server";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import { PremiseStack } from "@/components/premise";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export default async function RootPage() {
  const t = await getTranslations("main");
  const premiseIdList = await prisma.premise.findMany({
    select: { id: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
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
      <section
        className={container({
          display: "flex",
          gap: "45px",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock: "50px 100px",
        })}
      >
        <h2 className={css({ textStyle: "heading.3", fontWeight: "bold" })}>
          {t("heading_popular")}
        </h2>
        <PremiseStack premiseIdList={premiseIdList} />
      </section>
    </>
  );
}
