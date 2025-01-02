export type PremiseType = keyof IntlMessages["premise_types"];

export const premiseTypes: PremiseType[] = [
  "dance_halls",
  "gyms",
  "photo_studios",
  "cafe",
  "bars",
  "restaurants",
  "coworking",
  "game_rooms",
  "event_spaces",
  "banquet_halls",
  "conference_rooms",
  "beauty_salons",
  "workshops",
  "galleries",
  "cinemas",
  "garages",
  "community_centers",
  "special_events_etc",
  "commercial_kitchens",
  "sport_hall",
  "yoga_hall",
  "group_meetings",
  "birthday",
  "else",
];

/**
 * @description Should be updated if bucket is changed. `kinguru-storage` is used. Extension `.jpg` is default
 */
export function getPremiseTypePreviewLink(type: string, extension?: "jpg") {
  return `https://kinguru-storage.s3.pl-waw.scw.cloud/premises/static/types/${type}.${extension || "jpg"}`;
}
