"use server";

import type { SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";
import { buildQueryParts, defaultSizings } from "./query-parts-builder";
import { esClient } from "@/esClient";
import { logger } from "@/lib/logger";

export type PremiseFulfilledDocument = {
  id: string;
  coordinates: number[];
};

function getSearchTotalCount(total: SearchTotalHits | number) {
  return typeof total === "number" ? total : total.value;
}

const getPremisesLogger = logger.child({ name: "buildQueryParts" });
// export async function syncPremisesWithElastic() {
//   const premises = await prisma.premise.findMany({
//     select: {
//       id: true,
//       information: { select: { locale: true, description: true } },
//       openHours: { orderBy: { price: "asc" } },
//       venue: {
//         select: {
//           name: true,
//           information: { select: { locale: true, description: true } },
//           locationMapboxId: true,
//         },
//       },
//     },
//   });
//   if (premises.length === 0) return;

//   const body = premises.flatMap((premise) => [
//     {
//       index: {
//         _index: process.env.ES_INDEX_PREMISE_FULFILLED,
//         _id: premise.id,
//       },
//     },
//     premise,
//   ]);

//   try {
//     const bulkResponse = await esClient.bulk({ refresh: true, body });

//     if (bulkResponse.errors) {
//       console.error("Bulk insert/update failed:", bulkResponse.errors);
//     } else {
//       console.log(`Successfully synced ${premises.length} premises`);
//     }
//   } catch (error) {
//     console.error("Elasticsearch bulk sync failed:", error);
//   }
// }
export async function getPremises(searchParams: Record<string, any>) {
  const { must, sort, size, must_not } = buildQueryParts(searchParams);
  getPremisesLogger.info({ must, sort, size, must_not });

  const response = await esClient
    .search<PremiseFulfilledDocument>({
      index: process.env.ES_INDEX_PREMISE_FULFILLED,
      _source_includes: ["id", "coordinates"],
      filter_path: "hits.total.value,hits.hits._source",
      size: size,
      from: defaultSizings.from,
      query: { bool: { must, must_not } },
      sort,
    })
    .catch(() => null);
  console.log(JSON.stringify(response, null, 2), "response");

  if (!response) {
    return {
      hits: [],
      total: 0,
    };
  }

  const hits = response.hits.hits || []; // expect `undefined` since `filter_path`

  return {
    hits: hits.map((hit) => ({
      id: hit._source?.id,
      coordinates: hit._source?.coordinates,
    })) as PremiseFulfilledDocument[],
    total: getSearchTotalCount(response.hits.total || 0),
  };
}
