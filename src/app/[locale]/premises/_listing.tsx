import { getTranslations } from "next-intl/server";
import { LoadMoreLink, SortToggler } from "@/components/filters";
import { PremiseStack } from "@/components/premise";
import { getPremises, defaultSizings } from "@/lib/actions/premise-filter";
import { Flex, InlineBox, Stack } from "~/styled-system/jsx";

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
    <Stack gap="3">
      <Flex
        gap="2"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <InlineBox fontSize="sm" fontWeight="bold" flexGrow="5">
          {t("variants_found", { total })}
        </InlineBox>
        <SortToggler
          pathname="/premises"
          searchParams={searchParams}
          items={sortItems}
          defaultLabel={t(`sorting.${sort}`)}
        />
      </Flex>
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
