import { type SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { logger } from "@/lib/logger";

export async function retrieveLocationPropertiesById(mapboxId: string) {
  const retrieveUrl = new URL(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}`,
  );
  retrieveUrl.searchParams.set("access_token", process.env.MAPBOX_TOKEN || "");
  retrieveUrl.searchParams.set(
    "session_token",
    "retrieveLocationPropertiesById",
  );

  try {
    const response = await fetch(retrieveUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      logger.error(await response.json());
      return null;
    }

    const { features }: SearchBoxRetrieveResponse = await response.json();

    // since it retrieves by mapbox_id, there is only one feature to take
    const feature = features.at(0);

    if (!feature) return null;

    return feature.properties;
  } catch (e) {
    logger.error(e);
    return null;
  }
}
