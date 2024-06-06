"use server";

import type { ApiResponse } from "@elastic/elasticsearch";
import { buildQueryParts, defaultSizings } from "./query-parts-builder";
import { esClient } from "@/esClient";

type PremiseHitWithId = { _source: { id: string } };
type PremisesResponse = {
  hits: {
    total: { value: number };
    hits: PremiseHitWithId[] | undefined; // since `hits.hits._source` filter path hits won't be present as empty array
  };
};

export async function getPremises(searchParams: Record<string, any>) {
  const { must, sort, size, must_not } = buildQueryParts(searchParams);

  const response: ApiResponse<PremisesResponse> = await esClient.search({
    index: process.env.ES_INDEX_PREMISE_FULFILLED,
    _source_includes: ["id"],
    filter_path: "hits.total.value,hits.hits._source",
    size,
    from: defaultSizings.from,
    body: { query: { bool: { must, must_not } }, sort },
  });

  return response.body.hits;
}
