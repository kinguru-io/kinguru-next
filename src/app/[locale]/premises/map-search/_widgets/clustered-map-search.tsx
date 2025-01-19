import mapboxgl from "mapbox-gl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { useDebouncedCallback } from "use-debounce";
import { CloseMapButton } from "./close-map-button";
import { ClusterMap } from "./cluster-map";
import {
  initialViewStatePoland,
  lgMediaQuery,
  polandBoundingBoxPoints,
  type PremiseViewData,
} from "./config";
import { ListingSidebar } from "./listing-sidebar";
import { PremiseListing } from "./premise-listing";
import { getPremiseViewDataAction } from "@/components/premise/get-premise-view-data-action";
import { useModal } from "@/components/uikit";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  getPremises,
  type PremiseFulfilledDocument,
} from "@/lib/actions/premise-filter/listing";
import { usePathname, useRouter } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Float } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

export function ClusteredMapSearch() {
  const sourceId = useId();
  const layerId = useId();

  const isAboveLg = useMediaQuery(lgMediaQuery);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setOpen } = useModal();
  const [premises, setPremises] = useState<PremiseFulfilledDocument[]>([]);
  const [premiseViews, setPremiseViews] = useState<PremiseViewData>(null);

  const fetchPremiseData = useCallback(async (ids: string[]) => {
    setOpen(true);
    setPremiseViews("pending");

    const settledViews = await Promise.all(
      ids.map((id) => getPremiseViewDataAction(id)),
    );
    setPremiseViews(settledViews.filter((view) => view !== null));
  }, []);

  useEffect(() => {
    const search = new URLSearchParams(searchParams);

    if (!search.get("bbox")) {
      search.set("bbox", polandBoundingBoxPoints);
    }

    void getPremises(Object.fromEntries(search.entries())).then(({ hits }) => {
      setPremises(hits);

      if (isAboveLg) {
        void fetchPremiseData(hits.map((hit) => hit.id));
      }
    });
  }, [searchParams, isAboveLg]);

  const boundingBoxChanged = useDebouncedCallback((points: string) => {
    const search = new URLSearchParams(searchParams);

    search.set("bbox", points);

    router.replace(`${pathname}?${search}`, { scroll: false });
  }, 250);

  // hydrate initial view state from search params (if present)
  const initialViewState = useMemo(() => {
    const pointsString = searchParams.get("bbox");

    if (!pointsString) return initialViewStatePoland;

    const points = pointsString
      .split(",")
      .map((point) => Number(point))
      .filter((point) => !Number.isNaN(point));

    if (points.length !== 4) return initialViewStatePoland;

    const northEast = new mapboxgl.LngLat(points[0], points[1]);
    const southWest = new mapboxgl.LngLat(points[2], points[3]);
    const boundingBoxCenter = new mapboxgl.LngLatBounds(
      southWest,
      northEast,
    ).getCenter();

    return {
      zoom: 6,
      latitude: boundingBoxCenter.lat,
      longitude: boundingBoxCenter.lng,
    } as const;
  }, []);

  // data for clustering
  const featureCollection = useMemo(() => {
    return {
      type: "FeatureCollection" as const,
      features: premises.map((hit) => {
        const { coordinates, ...properties } = hit;

        return {
          type: "Feature" as const,
          properties,
          geometry: { type: "Point" as const, coordinates },
        };
      }),
    };
  }, [premises]);

  return (
    <section
      data-hide-footer
      className={css({
        maxWidth: "breakpoint-3xl",
        marginInline: "auto",
        width: "full",
        height: "full",
        lg: {
          padding: "10",
        },
      })}
    >
      <Box
        css={{
          height: "full",
          lg: {
            display: "flex",
            gap: "8",
            maxHeight: "calc(100vh - 9.875rem)",
          },
        }}
      >
        <Box
          css={{
            position: "relative",
            width: "full",
            height: "full",
            lg: {
              borderRadius: "xl",
              overflow: "hidden",
            },
          }}
        >
          <Float placement="top-end" offset="10" css={{ zIndex: "1" }}>
            <CloseMapButton variant="icon" />
          </Float>
          <ClusterMap
            layerId={layerId}
            featuresClicked={fetchPremiseData}
            bboxChanged={boundingBoxChanged}
            initialViewState={initialViewState}
          >
            <Source
              cluster
              id={sourceId}
              type="geojson"
              data={featureCollection}
            >
              <Layer
                id={layerId}
                source={sourceId}
                interactive
                type="circle"
                paint={{
                  "circle-color": token("colors.primary"),
                  "circle-radius": 24,
                }}
              />

              <Layer
                source={sourceId}
                type="symbol"
                layout={{
                  "text-font": ["Arial Unicode MS Bold"],
                  "text-field": "{point_count_abbreviated}",
                  "text-size": 18,
                }}
              />
              <Layer
                source={sourceId}
                type="symbol"
                filter={["!", ["has", "point_count"]]}
                layout={{
                  "text-font": ["Arial Unicode MS Bold"],
                  "text-field": "1",
                  "text-size": 18,
                }}
              />
            </Source>
          </ClusterMap>
        </Box>
        <ListingSidebar
          listingSlot={<PremiseListing premiseViews={premiseViews} />}
        />
      </Box>
    </section>
  );
}
