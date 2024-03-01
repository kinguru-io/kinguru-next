"use client";

import mapboxgl from "mapbox-gl";
import { Map } from "react-map-gl";

export function VenueMap({ mapboxId }: { mapboxId: string }) {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    />
  );
}
