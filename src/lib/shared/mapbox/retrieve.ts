import {
  type SearchBoxFeatureSuggestion,
  type SearchBoxRetrieveResponse,
} from "@mapbox/search-js-core";
import { logger } from "@/lib/logger";

export async function retrieveLocationPropertiesById(
  mapboxId: string,
  fetchTZ?: boolean,
) {
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
    if (!fetchTZ) return feature.properties;

    return { ...feature.properties, TZID: await fetchTimeZone(feature) };
  } catch (e) {
    logger.error(e);
    return null;
  }
}

async function fetchTimeZone(data: SearchBoxFeatureSuggestion) {
  const {
    properties: {
      coordinates: { longitude, latitude },
    },
  } = data;

  const tileQueryURL = new URL(
    `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${longitude},${latitude}.json`,
  );

  tileQueryURL.searchParams.set("access_token", process.env.MAPBOX_TOKEN || "");

  const response = await fetch(tileQueryURL.toString(), {
    next: { revalidate: 86400 }, // 24 hours
  });

  if (!response.ok) {
    logger.error(await response.json());
    return null;
  }

  const responseJson: { features: Array<{ properties: { TZID: string } }> } =
    await response.json();

  return responseJson.features[0].properties.TZID;
}
