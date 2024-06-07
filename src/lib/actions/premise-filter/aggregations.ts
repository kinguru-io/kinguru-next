"use server";

import type { ElasticAggs } from "./es-types";
import { esClient } from "@/esClient";

const premiseAggregationsQuery = {
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

export type PremiseAggregations = typeof premiseAggregationsQuery;

const aggregationsSearch = {
  index: process.env.ES_INDEX_PREMISE_FULFILLED,
  filter_path: "aggregations",
  size: 0,
  body: { aggs: premiseAggregationsQuery },
};

export async function getPremiseAggregations() {
  const response = await esClient.search<
    PremiseAggregations,
    ElasticAggs<PremiseAggregations>
  >(aggregationsSearch);

  return response.aggregations || {};
}
