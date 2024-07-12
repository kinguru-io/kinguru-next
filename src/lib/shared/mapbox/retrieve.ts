import { type SearchBoxRetrieveResponse } from "@mapbox/search-js-core";

export async function retrieveLocationPropertiesById(mapboxId: string) {
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

  const {
    features: [{ properties }],
  }: SearchBoxRetrieveResponse = await response.json();

  return properties;
}
