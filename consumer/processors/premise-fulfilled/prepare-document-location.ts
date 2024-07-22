import type {
  SearchBoxCore,
  SearchBoxSuggestion,
} from "@mapbox/search-js-core";
import { z } from "zod";

const schemaTZID = z.object({
  features: z.array(z.object({ properties: z.object({ TZID: z.string() }) })),
});

export async function prepareDocumentLocation({
  mapboxId,
  searchBox,
}: {
  mapboxId: string;
  searchBox: SearchBoxCore;
}) {
  const mapboxResponse = await searchBox.retrieve(
    {
      mapbox_id: mapboxId,
    } as SearchBoxSuggestion,
    {
      sessionToken: "consumer.prepareDocumentLocation",
    },
  );
  const locationProperties = mapboxResponse.features.at(0)?.properties;
  const locationContext = locationProperties?.context || {};
  const longitude = locationProperties?.coordinates.longitude;
  const latitude = locationProperties?.coordinates.latitude;

  const tileQueryResponse = await fetch(
    `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${longitude},${latitude}.json?access_token=${searchBox.accessToken}`,
  );

  const parseResult = schemaTZID.safeParse(await tileQueryResponse.json());
  const timeZone = parseResult.success
    ? parseResult.data.features.at(0)?.properties?.TZID
    : "";

  return {
    "location.countryCode": locationContext.country?.country_code,
    "location.city": locationContext.place?.name,
    "location.timeZone": timeZone,
    "location.longitude": longitude,
    "location.latitude": latitude,
  };
}
