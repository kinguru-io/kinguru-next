import {
  Client,
  type RequestParams,
  type ApiResponse,
} from "@elastic/elasticsearch";
import { Filter, FilterItem } from "@/components/uikit/filters/filter";

const esClient = new Client({ node: process.env.ES_CLIENT_NODE });

const aggs = {
  minPrice: { min: { field: "minPrice" } },
  maxPrice: { max: { field: "maxPrice" } },
  minCapacity: { min: { field: "capacity" } },
  maxCapacity: { max: { field: "capacity" } },
  minArea: { min: { field: "area" } },
  maxArea: { max: { field: "area" } },
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

type FilterConfig<T> = {
  key: keyof T;
  behavior: "radio" | "checkbox";
};

type Bucket = {
  key: string;
  doc_count: number;
};

type TermsAgg = {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
};

type PrimitiveAgg = { value: number };

type Aggs<T> = {
  aggregations: {
    [Key in keyof T]?: "terms" extends keyof T[Key] ? TermsAgg : PrimitiveAgg;
  };
};

const filters: Array<FilterConfig<typeof aggs>> = [
  { key: "amenities", behavior: "checkbox" },
];

export async function PremiseFilter() {
  const {
    body: { aggregations },
  }: ApiResponse<Aggs<typeof aggs>> = await esClient.search(aggregationsSearch);

  return (
    <>
      <Filter heading="All filters">
        {filters.map(({ key, behavior }) => {
          const agg = aggregations[key];
          if (!agg) return null;

          if ("buckets" in agg) {
            return (
              <FilterItem key={key} heading={"not_intl_yet_" + key}>
                with buckets
              </FilterItem>
            );
          }

          return (
            <FilterItem key={key} heading={"not_intl_yet_" + key}>
              min + max filter
            </FilterItem>
          );
        })}
      </Filter>
      <pre>{JSON.stringify(aggregations, null, 2)}</pre>
    </>
  );
}
