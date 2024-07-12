import { type SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { getLogger } from "@/lib/logger.ts";

export async function retrieveLocationPropertiesById(mapboxId: string) {
  const logger = getLogger();
  const retrieveUrl = new URL(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}`,
  );
  retrieveUrl.searchParams.set("access_token", process.env.MAPBOX_TOKEN || "");
  retrieveUrl.searchParams.set(
    "session_token",
    "retrieveLocationPropertiesById",
  );

  const response = await fetch(retrieveUrl.toString(), {
    next: { revalidate: 3600 },
  });

  const retrieveResponse: SearchBoxRetrieveResponse = await response.json();

  logger.error({ ...retrieveResponse, mapbox_token: process.env.MAPBOX_TOKEN });

  return retrieveResponse.features.at(0)?.properties;
}
