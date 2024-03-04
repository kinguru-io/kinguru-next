"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";

import {
  useSearchBoxCore,
  type Coordinates,
} from "@/hooks/mapbox/useSearchBoxCore";

import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function VenueMap({ mapboxId }: { mapboxId: string }) {
  const { retrieve } = useSearchBoxCore({ accessToken });
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const { longitude, latitude } = data.features[0].properties.coordinates;
      setCoordinates({ latitude, longitude });
    });
  }, [mapboxId]);

  return (
    <Map
      style={{ position: "absolute" }}
      mapboxAccessToken={accessToken}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/light-v11"
      initialViewState={{ zoom: 13 }}
      {...coordinates}
    >
      {coordinates && <Marker {...coordinates}>'123'</Marker>}
    </Map>
  );
}
