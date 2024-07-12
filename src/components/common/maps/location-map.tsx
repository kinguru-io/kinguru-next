"use client";

import mapboxgl from "mapbox-gl";
import { Map, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const initialViewStateWarsaw = {
  zoom: 10,
  latitude: 52.237049,
  longitude: 21.017532,
} as const;

/**
 * @description <Marker /> or collection of markers are being passed by {children} prop
 */
export function LocationMap({
  children,
  longitude,
  latitude,
  style,
}: {
  longitude?: number;
  latitude?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const initialViewState = [longitude, latitude].every(Boolean)
    ? { zoom: 14, longitude, latitude }
    : initialViewStateWarsaw;

  return (
    <Map
      style={style}
      mapboxAccessToken={accessToken}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      initialViewState={initialViewState}
      testMode={process.env.NODE_ENV === "development"}
      scrollZoom={false}
      attributionControl={false}
      reuseMaps // keep in mind `reuseMaps` prop in case weird perf problems occur
    >
      <NavigationControl position="bottom-right" />
      {children}
    </Map>
  );
}
