import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { PremiseTypeCard, PremiseTypeCardSkeleton } from "./premise-type-card";
import { PremiseTypeCardsWrapper } from "./premise-type-cards-wrapper";
import { PremiseTypeCollapse } from "./premise-type-collapse";
import { getPremiseAggregationsByType } from "@/lib/actions/premise-filter";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export function PremiseTypeListing() {
  const t = useTranslations("main");

  return (
    <div
      className={css({
        paddingBlock: "8",
        backgroundColor: "secondary.lightest",
      })}
    >
      <section className={container()}>
        <h2
          className={css({
            textStyle: "heading.section",
            marginBlockEnd: { base: "6", md: "8" },
          })}
        >
          {t("heading_premise_types")}
        </h2>

        <Suspense fallback={<PremiseTypeCardsSkeletons />}>
          <PremiseTypeCards take={6} />
        </Suspense>
      </section>
    </div>
  );
}

async function PremiseTypeCards({ take }: { take: number }) {
  const typeAggregations = await getPremiseAggregationsByType({
    omitMap: { else: true, birthday: true, special_events_etc: true },
  });

  const cardsNodes = typeAggregations
    .slice(0, take)
    .map(({ key }) => <PremiseTypeCard key={key} typeKey={key} />);

  if (typeAggregations.length <= take) {
    return <PremiseTypeCardsWrapper>{cardsNodes}</PremiseTypeCardsWrapper>;
  }

  return (
    <>
      <PremiseTypeCardsWrapper>{cardsNodes}</PremiseTypeCardsWrapper>
      <PremiseTypeCollapse>
        <div className={css({ marginBlockStart: { base: "2", sm: "4" } })}>
          <PremiseTypeCardsWrapper>
            {typeAggregations.slice(take).map(({ key }) => (
              <PremiseTypeCard key={key} typeKey={key} />
            ))}
          </PremiseTypeCardsWrapper>
        </div>
      </PremiseTypeCollapse>
    </>
  );
}

function PremiseTypeCardsSkeletons() {
  return (
    <PremiseTypeCardsWrapper>
      {Array.from({ length: 6 }).map((_, index) => (
        <PremiseTypeCardSkeleton key={index} />
      ))}
    </PremiseTypeCardsWrapper>
  );
}
