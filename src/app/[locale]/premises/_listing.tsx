import { getTranslations } from "next-intl/server";
import { SortToggler } from "../../../components/filters/sort-toggler";
import { PremiseStack } from "@/components/premise";
import { getPremises } from "@/lib/actions/premise-filter";
import { HStack, InlineBox, Stack } from "~/styled-system/jsx";

export async function Listing({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const {
    total: { value: total },
    hits,
  } = await getPremises(searchParams);
  const t = await getTranslations("filters");
  const { sort = "label" } = searchParams;
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
          defaultLabel={t(
            `sorting.${sort as keyof IntlMessages["filters"]["sorting"]}`,
          )}
        />
      </HStack>
      <PremiseStack premiseIdList={hits.map(({ _source }) => _source)} />
    </Stack>
  );
}
