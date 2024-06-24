import { getLocale, getTranslations } from "next-intl/server";
import { RangeItem, TermsItem } from "./filter-atoms";
import { FilterCollapse } from "./filter-collapse";
import { FilterGroupWrapper } from "./filter-group-wrapper";
import type { GlobalAgg, TermsAgg } from "@/lib/actions/premise-filter";
import { filterDefaults } from "@/lib/shared/config/filters";
import { InlineBox, Stack } from "~/styled-system/jsx";

type RangedType = "range";
type GroupedType = "checkbox" | "radio";

type RangedMeta = { helper: keyof IntlMessages["filters"]["helpers"] };
type GroupedMeta = {
  intl: "native" | "custom";
  intlKey?: Extract<keyof IntlMessages, "amenities" | "premise_types">;
};

type FilterMeta =
  | {
      behavior: RangedType;
      meta: RangedMeta;
    }
  | {
      behavior: GroupedType;
      meta?: GroupedMeta;
    };

export type FilterConfig<T> = {
  aggKey: keyof T;
} & FilterMeta;

function isRanged(
  behavior: GroupedType | RangedType,
  aggs: GlobalAgg | TermsAgg,
): aggs is GlobalAgg {
  return behavior === "range" && "min" in aggs && "max" in aggs;
}

function isMetaRanged(meta: FilterMeta["meta"]): meta is RangedMeta {
  return meta !== undefined && "helper" in meta;
}

function isMetaGrouped(meta: FilterMeta["meta"]): meta is GroupedMeta {
  return meta !== undefined && "intl" in meta;
}

async function getKeyFormatter(meta: FilterMeta["meta"]) {
  // leaving as is in order to render a key always even though its translations aren't handled on our side
  if (!isMetaGrouped(meta)) return (key: string) => key;
  if (meta.intl === "custom") return getTranslations(meta.intlKey);

  const locale = await getLocale();
  const countryFormatter = new Intl.DisplayNames([locale], { type: "region" });

  return countryFormatter.of.bind(countryFormatter);
}

export async function FilterElement({
  aggName,
  behavior,
  data,
  meta,
  take = filterDefaults.take,
  handleFrom = filterDefaults.handleFrom,
}: {
  aggName: string;
  behavior: GroupedType | RangedType;
  data: GlobalAgg | TermsAgg;
  meta: FilterMeta["meta"];
  take?: number;
  handleFrom?: number;
}) {
  const t = await getTranslations("filters");

  if (isMetaRanged(meta) && isRanged(behavior, data)) {
    const { min, max } = data;
    const { helper } = meta;

    return (
      <>
        <InlineBox color="secondary" fontSize="px13" marginBlockStart="-3">
          {t(`helpers.${helper}`)}
        </InlineBox>
        <RangeItem
          min={min.value}
          max={max.value}
          fieldName={aggName}
          fromLabel={t("range_from_label")}
          toLabel={t("range_to_label")}
        />
      </>
    );
  }

  if (!("buckets" in data)) return null;

  const formatKey = await getKeyFormatter(meta);
  const isRadio = behavior === "radio";

  const allTerms = data.buckets.map(({ key }) => (
    <TermsItem
      key={key}
      termName={aggName}
      inputName={key}
      // @ts-expect-error
      label={formatKey(key) || key}
      isRadio={isRadio}
    />
  ));

  const sliceTo = allTerms.length >= handleFrom ? take : allTerms.length;

  return (
    <FilterGroupWrapper shouldReplace={isRadio}>
      <Stack gap="2">{allTerms.slice(0, sliceTo)}</Stack>
      {allTerms.length >= handleFrom && (
        <FilterCollapse
          count={allTerms.length}
          showLabel={t("show_all_btn_label")}
          hideLabel={t("hide_btn_label")}
        >
          <Stack gap="2" alignItems="flex-start">
            {allTerms.slice(take)}
          </Stack>
        </FilterCollapse>
      )}
    </FilterGroupWrapper>
  );
}
