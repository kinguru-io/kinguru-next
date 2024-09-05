import { getLocale, getTranslations } from "next-intl/server";
import { RangeItem, TermsItem } from "./filter-atoms";
import { FilterCollapse } from "./filter-collapse";
import { FilterGroupWrapper } from "./filter-group-wrapper";
import type { GlobalAgg, TermsAgg } from "@/lib/actions/premise-filter";
import { filterDefaults } from "@/lib/shared/config/filters";
import { groupBy } from "@/lib/shared/utils/array";
import { css } from "~/styled-system/css";
import { InlineBox, Stack } from "~/styled-system/jsx";

type RangedType = "range";
type GroupedType = "checkbox" | "radio";

type RangedMeta = { helper: keyof IntlMessages["filters"]["helpers"] };
type GroupedMeta = {
  intl: "native" | "custom";
  intlKey?: Extract<keyof IntlMessages, "amenities" | "premise_types">;
  tagKeyMap?: Record<string, string>;
};

type FilterMeta =
  | { behavior: RangedType; meta: RangedMeta }
  | { behavior: GroupedType; meta?: GroupedMeta };

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

  if (isMetaGrouped(meta) && meta.tagKeyMap) {
    const groupedTags = groupBy(data.buckets, ({ key }) =>
      meta.tagKeyMap ? meta.tagKeyMap[key] : "not_defined",
    );

    return (
      <FilterGroupWrapper shouldReplace={isRadio}>
        {Object.keys(groupedTags).map((groupKey) => {
          const terms = groupedTags[groupKey];

          if (!terms) return null;

          // @ts-expect-error
          const groupLabel = formatKey(`group.${groupKey}`);
          const allTerms = terms.map(({ key }) => (
            <TermsItem
              key={key}
              termName={aggName}
              inputName={key}
              // @ts-expect-error
              label={formatKey(key) || key}
              isRadio={isRadio}
            />
          ));

          return (
            <Stack key={groupKey} gap="2">
              <span className={css({ fontWeight: "bold", fontSize: "xs" })}>
                {groupLabel}
              </span>
              <Stack gap="2">
                <CollapsibleTagList
                  terms={allTerms}
                  take={take - 1}
                  handleFrom={take}
                  showLabel={t("show_all_btn_label")}
                  hideLabel={t("hide_btn_label")}
                />
              </Stack>
            </Stack>
          );
        })}
      </FilterGroupWrapper>
    );
  }

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

  return (
    <FilterGroupWrapper shouldReplace={isRadio}>
      <CollapsibleTagList
        terms={allTerms}
        take={take}
        handleFrom={handleFrom}
        showLabel={t("show_all_btn_label")}
        hideLabel={t("hide_btn_label")}
      />
    </FilterGroupWrapper>
  );
}

function CollapsibleTagList({
  terms,
  take,
  handleFrom,
  showLabel,
  hideLabel,
}: {
  terms: React.ReactNode[];
  take: number;
  handleFrom: number;
  showLabel: string;
  hideLabel: string;
}) {
  const sliceTo = terms.length >= handleFrom ? take : terms.length;

  return (
    <>
      <Stack gap="2">{terms.slice(0, sliceTo)}</Stack>
      {terms.length >= handleFrom && (
        <FilterCollapse
          count={terms.length}
          showLabel={showLabel}
          hideLabel={hideLabel}
        >
          <Stack gap="2" alignItems="flex-start">
            {terms.slice(take)}
          </Stack>
        </FilterCollapse>
      )}
    </>
  );
}
