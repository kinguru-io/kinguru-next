import {
  SearchBoxCore,
  SearchBoxOptions,
  SearchBoxRetrieveResponse,
  SearchBoxSuggestion,
} from "@mapbox/search-js-core";
import { useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

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
      suggestion: SearchBoxSuggestion,
      cb: (data: SearchBoxRetrieveResponse) => void,
    ) => {
      void search
        .retrieve(suggestion, {
          sessionToken: "test-123",
        })
        .then((data) => cb(data));
    },
    300,
  );

  return { fetchSuggestions, retrieve, search };
};
