import mapboxgl, { type GeoJSONSource } from "mapbox-gl";
import { useRef } from "react";
import {
  type MapProps,
  type MapRef,
  Map,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function ClusterMap({
  children,
  layerId,
  featuresClicked,
  bboxChanged,
  initialViewState,
}: {
  children: React.ReactNode;
  layerId: string;
  featuresClicked: (ids: string[]) => void;
  bboxChanged: (points: string) => void;
  initialViewState?: MapProps["initialViewState"];
}) {
  const mapRef = useRef<MapRef>(null);

  return (
    <Map
      reuseMaps // keep in mind `reuseMaps` prop in case weird perf problems occur
      initialViewState={initialViewState}
      ref={mapRef}
      mapboxAccessToken={accessToken}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      testMode={process.env.NODE_ENV === "development"}
      attributionControl={false}
      interactiveLayerIds={[layerId]}
      onClick={(e) => {
        const feature = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: [layerId],
        })[0];

        if (!feature) return;

        const clusterId: number | undefined = feature.properties?.cluster_id;

        if (!clusterId) {
          mapRef.current?.easeTo({
            // @ts-expect-error coordinates are supposed to be [number, number]
            center: feature.geometry.coordinates,
            zoom: 16,
          });

          featuresClicked([feature.properties?.id]);
          return;
        }

        const source = mapRef.current.getSource(
          feature.source,
        ) as GeoJSONSource;

        source.getClusterChildren(clusterId, (clusterChildrenError, data) => {
          if (clusterChildrenError) return;
          if (data.some((feat) => feat.properties?.cluster)) {
            source.getClusterExpansionZoom(clusterId, (zoomError, zoom) => {
              if (zoomError) return;
              mapRef.current?.easeTo({
                // @ts-expect-error coordinates are supposed to be [number, number]
                center: feature.geometry.coordinates,
                zoom,
              });
            });
            return;
          }

          mapRef.current?.easeTo({
            // @ts-expect-error coordinates are supposed to be [number, number]
            center: feature.geometry.coordinates,
            zoom: 16,
          });

          featuresClicked(data.map(({ properties }) => properties?.id));
        });
      }}
      onMove={() => {
        const bounds = mapRef.current?.getBounds();

        if (!bounds) return;

        const { _ne, _sw } = bounds;

        bboxChanged([_ne.lng, _ne.lat, _sw.lng, _sw.lat].join(","));
      }}
    >
      <NavigationControl position="bottom-right" />
      {children}
    </Map>
  );
}
