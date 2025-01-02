import { getTranslations } from "next-intl/server";
import { FilterControlWrapper } from "./filter-entry";
import { ResetFilterButton } from "./reset-filter-button";
import { FilterElement, type FilterConfig } from "@/components/filters";
import { Button, Filter, FilterGroup } from "@/components/uikit";
import {
  getPremiseAggregations,
  type PremiseAggregations,
} from "@/lib/actions/premise-filter";
import { amenityTagKeyMap } from "@/lib/shared/config/amenities";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

const filters: Array<FilterConfig<PremiseAggregations>> = [
  {
    aggKey: "countryCode",
    behavior: "radio",
    meta: { intl: "native" },
  },
  {
    aggKey: "city",
    behavior: "radio",
  },
  {
    aggKey: "price",
    behavior: "range",
    meta: { helper: "price" },
  },
  {
    aggKey: "type",
    behavior: "checkbox",
    meta: { intl: "custom", intlKey: "premise_types" },
  },
  {
    aggKey: "capacity",
    behavior: "range",
    meta: { helper: "capacity" },
  },
  {
    aggKey: "area",
    behavior: "range",
    meta: { helper: "area" },
  },
  {
    aggKey: "amenities",
    behavior: "checkbox",
    meta: { intl: "custom", intlKey: "amenities", tagKeyMap: amenityTagKeyMap },
  },
];

export async function PremiseFilter() {
  const aggregations = await getPremiseAggregations();
  const t = await getTranslations("filters");

  return (
    <Stack gap="0">
      <Filter heading={t("all")}>
        {filters.map(({ aggKey, behavior, meta }) => {
          const aggregation = aggregations[aggKey];

          if (!aggregation) return null;

          return (
            <FilterGroup key={aggKey} heading={t(`group.${aggKey}`)}>
              <FilterElement
                aggName={aggKey}
                behavior={behavior}
                data={aggregation}
                meta={meta}
              />
            </FilterGroup>
          );
        })}
      </Filter>
      <FilterControlWrapper>
        <ResetFilterButton label={t("reset_btn_label")} />
        <Button className={css({ md: { display: "none" } })}>
          {t("show_result_btn_label")}
        </Button>
      </FilterControlWrapper>
    </Stack>
  );
}
