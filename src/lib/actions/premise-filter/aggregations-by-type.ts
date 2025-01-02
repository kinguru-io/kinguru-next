import type { ElasticAggs } from "./es-types";
import { esClient } from "@/esClient";
import type { PremiseType } from "@/lib/shared/config/premise-types";

const premiseAggregationsByTypeQuery = {
  type: {
    terms: {
      field: "type.keyword",
      size: 10000,
    },
  },
};

export type PremiseAggregationsByType = typeof premiseAggregationsByTypeQuery;

const aggregationsSearch = {
  index: process.env.ES_INDEX_PREMISE_FULFILLED,
  filter_path: "aggregations",
  size: 0,
  body: { aggs: premiseAggregationsByTypeQuery },
};

export async function getPremiseAggregationsByType<T extends PremiseType>({
  omitMap,
}: {
  omitMap?: Record<T, true>;
}) {
  const response = await esClient.search<
    PremiseAggregationsByType,
    ElasticAggs<PremiseAggregationsByType>
  >(aggregationsSearch);

  const buckets = response.aggregations?.type?.buckets || [];

  return omitMap ? buckets.filter(({ key }) => !omitMap[key as T]) : buckets;
}
