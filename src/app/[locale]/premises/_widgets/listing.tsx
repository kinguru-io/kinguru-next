import { getTranslations } from "next-intl/server";
import { MapSearchLink } from "./map-search-link";
import { LoadMoreLink, SortToggler } from "@/components/filters";
import { PremiseStack } from "@/components/premise";
import { defaultSizings } from "@/lib/actions/premise-filter";
import { getPremises } from "@/lib/actions/premise-filter/listing";
import { Flex, InlineBox, Stack } from "~/styled-system/jsx";

export async function Listing({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const { total, hits } = await getPremises(searchParams);
  const t = await getTranslations("filters");

  return (
    <Stack gap="3">
      <MapSearchLink />
      <Flex
        gap="2"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <InlineBox fontSize="sm" fontWeight="bold" flexGrow="5">
          {t("variants_found", { total })}
        </InlineBox>
        <SortToggler />
      </Flex>
      <PremiseStack premiseIdList={hits} />
      <LoadMoreLink
        take={defaultSizings.size}
        initialSize={defaultSizings.size}
        total={total}
        searchParams={searchParams}
        label={t("show_more")}
      />
    </Stack>
  );
}
