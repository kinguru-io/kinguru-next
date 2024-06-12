import { getTranslations } from "next-intl/server";
import { LoadMoreLink, SortToggler } from "@/components/filters";
import { PremiseStack } from "@/components/premise";
import { getPremises, defaultSizings } from "@/lib/actions/premise-filter";
import { HStack, InlineBox, Stack } from "~/styled-system/jsx";

export async function Listing({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const { total, hits } = await getPremises(searchParams);
  const t = await getTranslations("filters");

  const sort: keyof IntlMessages["filters"]["sorting"] =
    searchParams.sort || "label";
  const sortItems = [
    {
      value: "asc",
      label: t("sorting.asc"),
    },
    {
      value: "desc",
      label: t("sorting.desc"),
    },
  ];

  return (
    <Stack gap="15px">
      <HStack justifyContent="space-between">
        <InlineBox color="neutral.0" textStyle="heading.6">
          {t("variants_found", { total })}
        </InlineBox>
        <SortToggler
          pathname="/premises"
          searchParams={searchParams}
          items={sortItems}
          defaultLabel={t(`sorting.${sort}`)}
        />
      </HStack>
      <PremiseStack premiseIdList={hits} />
      <LoadMoreLink
        take={defaultSizings.size}
        initialSize={defaultSizings.size}
        total={total}
        pathname="/premises"
        searchParams={searchParams}
        label={t("show_more")}
      />
    </Stack>
  );
}
