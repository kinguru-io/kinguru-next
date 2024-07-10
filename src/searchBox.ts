import {
  SearchBoxCore,
  type SearchBoxSuggestion,
} from "@mapbox/search-js-core";

export const searchBox = new SearchBoxCore({
  accessToken: process.env.MAPBOX_TOKEN,
});

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

export async function retrieveLocationPropertiesById(mapbox_id: string) {
  try {
    const {
      features: [{ properties }],
    } = await searchBox.retrieve(
      { ...emptySuggestionObject, mapbox_id },
      { sessionToken: "test-123" },
    );

    return properties;
  } catch (_) {
    return null;
  }
}
