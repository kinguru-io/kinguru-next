"use server";

import type { SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";
import { buildQueryParts, defaultSizings } from "./query-parts-builder";
import { esClient } from "@/esClient";
import { logger } from "@/lib/logger";

type PremiseFulfilledDocument = { id: string };

function getSearchTotalCount(total: SearchTotalHits | number) {
  return typeof total === "number" ? total : total.value;
}

const getPremisesLogger = logger.child({ name: "buildQueryParts" });

export async function getPremises(searchParams: Record<string, any>) {
  const { must, sort, size, must_not } = buildQueryParts(searchParams);
  getPremisesLogger.info({ must, sort, size, must_not });

  const response = await esClient.search<PremiseFulfilledDocument>({
    index: process.env.ES_INDEX_PREMISE_FULFILLED,
    _source_includes: ["id"],
    filter_path: "hits.total.value,hits.hits._source",
    size,
    from: defaultSizings.from,
    query: { bool: { must, must_not } },
    sort,
  });

  const hits = response.hits.hits || []; // expect `undefined` since `filter_path`

  return {
    hits: hits.map((hit) => ({ id: hit._source?.id })),
    total: getSearchTotalCount(response.hits.total || 0),
  };
}
