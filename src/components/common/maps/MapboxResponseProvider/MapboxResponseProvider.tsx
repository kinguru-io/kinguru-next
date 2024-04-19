"use client";

import type { SearchBoxFeatureSuggestion } from "@mapbox/search-js-core";
import { useLocale } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";

import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import type { Locale } from "@/navigation";

type MapboxSearchBoxContextType = {
  searchResponse:
    | (SearchBoxFeatureSuggestion & { properties: { timeZone: string } })
    | null;
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxSearchBoxContext = createContext<MapboxSearchBoxContextType>({
  searchResponse: null,
});

export function useSearchBoxResponse() {
  const { searchResponse } = useContext(MapboxSearchBoxContext);
  return searchResponse;
}

export function useSearchBoxTimeZone() {
  const { searchResponse } = useContext(MapboxSearchBoxContext);
  return searchResponse
    ? searchResponse.properties.timeZone
    : Intl.DateTimeFormat().resolvedOptions().timeZone;
}

async function fetchTimeZone(data: SearchBoxFeatureSuggestion) {
  const {
    properties: {
      coordinates: { longitude, latitude },
    },
  } = data;

  const tileQueryInstance = await fetch(
    `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${longitude},${latitude}.json?access_token=${accessToken}`,
  );
  const responseJson: { features: Array<{ properties: { TZID: string } }> } =
    await tileQueryInstance.json();

  return responseJson.features[0].properties.TZID;
}

export function MapboxSearchBoxResponseProvider({
  mapboxId,
  children,
  locale: propsLocale,
  shouldFetchTimeZone = true,
}: {
  mapboxId: string;
  children: React.ReactNode;
  locale?: Locale;
  shouldFetchTimeZone?: boolean;
}) {
  const locale = useLocale() as Locale;
  const [searchResponse, setResponse] =
    useState<MapboxSearchBoxContextType["searchResponse"]>(null);
  const { retrieve } = useSearchBoxCore({ language: propsLocale || locale });

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, async (data) => {
      const mapboxFeatureRecord = data.features[0];
      const timeZone = shouldFetchTimeZone
        ? await fetchTimeZone(mapboxFeatureRecord)
        : "";

      setResponse({
        ...mapboxFeatureRecord,
        properties: { ...mapboxFeatureRecord.properties, timeZone },
      });
    });
  }, [mapboxId]);

  return (
    <MapboxSearchBoxContext.Provider value={{ searchResponse }}>
      {children}
    </MapboxSearchBoxContext.Provider>
  );
}
