import {
  Client,
  RequestParams,
  type ApiResponse,
} from "@elastic/elasticsearch";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { FilterElement, type FilterConfig } from "./_filter-element";
import { Filter, FilterGroup } from "@/components/uikit";
import { esClient } from "@/esClient";

const aggs = {
  price: {
    global: {},
    aggs: {
      min: { min: { field: "minPrice" } },
      max: { max: { field: "maxPrice" } },
    },
  },
  capacity: {
    global: {},
    aggs: {
      min: { min: { field: "capacity" } },
      max: { max: { field: "capacity" } },
    },
  },
  area: {
    global: {},
    aggs: {
      min: { min: { field: "area" } },
      max: { max: { field: "area" } },
    },
  },
  countryCode: {
    terms: {
      field: "location.countryCode.keyword",
      size: 10000,
    },
  },
  city: {
    terms: {
      field: "location.city.keyword",
      size: 10000,
    },
  },
  type: {
    terms: {
      field: "type.keyword",
      size: 10000,
    },
  },
  amenities: {
    terms: {
      field: "amenities.keyword",
      size: 10000,
    },
  },
};

const aggregationsSearch: RequestParams.Search = {
  index: process.env.ES_INDEX_PREMISE_FULFILLED,
  filter_path: "aggregations",
  size: 0,
  body: { aggs },
};

type Bucket = {
  key: string;
  doc_count: number;
};

const bucketSchema = z.object({
  key: z.string(),
  doc_count: z.number(),
});

type TermsAgg = {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
};

const termsAggSchema = z.object({
  doc_count_error_upper_bound: z.number(),
  sum_other_doc_count: z.number(),
  buckets: z.array(bucketSchema),
});

type GlobalAgg = {
  doc_count: number;
  min: { value: number };
  max: { value: number };
};

const globalAggSchema = z.object({
  doc_count: z.number(),
  min: z.object({ value: z.number() }),
  max: z.object({ value: z.number() }),
});

type Aggs<T> = {
  aggregations: {
    [Key in keyof T]?: "terms" extends keyof T[Key]
      ? TermsAgg
      : "global" extends keyof T[Key]
        ? GlobalAgg
        : never;
  };
};

const filters: Array<FilterConfig<typeof aggs>> = [
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
    meta: { literal: "price" },
  },
  {
    aggKey: "type",
    behavior: "checkbox",
    meta: { intl: "custom", intlKey: "premise_types" },
  },
  {
    aggKey: "capacity",
    behavior: "range",
    meta: { literal: "capacity" },
  },
  {
    aggKey: "area",
    behavior: "range",
    meta: { literal: "area" },
  },
  {
    aggKey: "amenities",
    behavior: "checkbox",
    meta: { intl: "custom", intlKey: "amenities" },
  },
];

export default async function PremiseFilter() {
  const {
    body: { aggregations },
  }: ApiResponse<Aggs<typeof aggs>> = await esClient.search(aggregationsSearch);
  const t = await getTranslations("filters");

  return (
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
  );
}
