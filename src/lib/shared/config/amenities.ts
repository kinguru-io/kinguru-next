export type AmenityGroup = keyof IntlMessages["amenities"]["group"];
export type Amenity = keyof Omit<IntlMessages["amenities"], "group">;

export const amenitiesTags: Record<AmenityGroup, Amenity[]> = {
  internet: ["wifi"],
  food: [
    "coffee",
    "catering",
    "waiter",
    "cutlery",
    "tablecloth",
    "kitchen",
    "water",
    "tea",
    "snacks",
  ],
  common: [
    "heating",
    "public_transport",
    "cloakroom",
    "cctv",
    "security",
    "soundproofing",
    "cleaning_service",
    "wc",
    "changing_room",
    "tech_elevators",
    "storage",
    "open_area",
    "access_24",
    "accessible",
  ],
  audio_video: [
    "projector",
    "screen",
    "speaker",
    "monitor",
    "speaker_bt",
    "speaker_wired",
    "apple_tv",
    "vfx_expert",
    "micro",
    "conference_phone",
    "audio_system",
    "video_equipment",
  ],
  lightning: ["light_equipment", "natural_light", "blackout"],
  inventory: [
    "magnet_board",
    "chairs",
    "chalk_board",
    "meeting_room",
    "flipcharts",
    "office_equipment",
    "printer",
    "private_phone_booths",
    "tables",
  ],
  lang: ["pl", "ua", "en", "by", "ru"],
  sports_inventory: [
    "yoga_mat",
    "yoga_blocks",
    "gym_bars",
    "gym_bands",
    "gym_gears",
    "mirrors",
    "balls",
    "hoop",
    "ballet_stand",
    "feetball",
  ],
  else: [
    "air_freshener",
    "green_bg",
    "white_bg",
    "scene",
    "good_view",
    "mansard_windows",
  ],
};

export const amenityTagKeyMap = Object.entries(amenitiesTags).reduce(
  (record, [key, tags]) => {
    tags.forEach((tag) => {
      record[tag] = key as AmenityGroup;
    });

    return record;
  },
  {} as Record<Amenity, AmenityGroup>,
);

export function isAmenityHandled(
  amenity: string,
): amenity is keyof typeof amenityTagKeyMap {
  return amenity in amenityTagKeyMap;
}
