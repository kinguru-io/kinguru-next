import { getTranslations } from "next-intl/server";
import { FilterElement, type FilterConfig } from "@/components/filters";
import { Filter, FilterGroup } from "@/components/uikit";
import {
  getPremiseAggregations,
  type PremiseAggregations,
} from "@/lib/actions/premise-filter";
import { Link } from "@/navigation";
import { Stack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

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
    meta: { intl: "custom", intlKey: "amenities" },
  },
];

export async function PremiseFilter() {
  const aggregations = await getPremiseAggregations();
  const t = await getTranslations("filters");

  return (
    <Stack gap="4">
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
      <Link
        className={button({ colorPalette: "dark", centered: true })}
        href="/premises"
        prefetch={false}
        replace
      >
        {t("reset_btn_label")}
      </Link>
    </Stack>
  );
}
