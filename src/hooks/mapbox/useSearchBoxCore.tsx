// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SearchBoxCore,
  SearchBoxOptions,
  SearchBoxRetrieveResponse,
  SearchBoxSuggestion,
} from "@mapbox/search-js-core";
import { useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

const emptySuggestionObject: SearchBoxSuggestion = {
  name: "",
  name_preferred: "",
  mapbox_id: "",
  feature_type: "",
  address: "",
  full_address: "",
  place_formatted: "",
  context: {},
  language: "",
  maki: "",
  poi_category: [""],
  brand: "",
  brand_id: "",
  external_ids: "",
  metadata: "",
  distance: 0,
  eta: 0,
  added_distance: 0,
  added_time: 0,
};

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export const useSearchBoxCore = (
  options: Partial<{ accessToken: string } & SearchBoxOptions>,
) => {
  const search = useMemo(() => {
    return new SearchBoxCore();
  }, []);

  useEffect(() => {
    const { accessToken, ...restOptions } = options;
    search.accessToken = accessToken || process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    search.defaults = {
      ...SearchBoxCore.defaults,
      ...restOptions,
    };
  }, [options]);

  const fetchSuggestions = useDebouncedCallback(
    (value: string, cb: (options: SearchBoxSuggestion[]) => void): void => {
      if (value.length < 5) return cb([]);

      void search
        .suggest(value, {
          sessionToken: "test-123",
        })
        .then(({ suggestions }) =>
          cb(
            suggestions.map((suggestion) => ({
              ...suggestion,
              label: suggestion.name + " " + suggestion.place_formatted,
            })),
          ),
        );
    },
    300,
  );

  const retrieve = useDebouncedCallback(
    (
      suggestion?: Partial<SearchBoxSuggestion> | null,
      cb?: (data: SearchBoxRetrieveResponse) => void,
    ) => {
      if (!suggestion) return;

      void search
        .retrieve(
          // in order to use e.g. `mapbox_id` only
          { ...emptySuggestionObject, ...suggestion },
          {
            sessionToken: "test-123",
          },
        )
        .then((data) => cb?.(data));
    },
    300,
  );

  return { fetchSuggestions, retrieve, search };
};
