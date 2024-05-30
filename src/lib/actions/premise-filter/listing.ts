"use server";

import type { ApiResponse } from "@elastic/elasticsearch";
import { buildQueryParts, defaultSizings } from "./query-parts-builder";
import { esClient } from "@/esClient";

type PremiseHitWithId = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: { id: string };
};
type PremisesResponse = {
  hits: {
    total: { value: number };
    hits: PremiseHitWithId[];
  };
};

export async function getPremises(searchParams: Record<string, any>) {
  const { must, sort, size } = buildQueryParts(searchParams);

  const response: ApiResponse<PremisesResponse> = await esClient.search({
    index: process.env.ES_INDEX_PREMISE_FULFILLED,
    _source_includes: ["id"],
    filter_path: "hits.total.value,hits.hits",
    size,
    from: defaultSizings.from,
    body: { query: { bool: { must } }, sort },
  });

  return response.body.hits;
}
