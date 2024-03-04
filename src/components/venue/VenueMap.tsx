"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";

import { Avatar, Card, CardBody } from "@/components/uikit";
import {
  useSearchBoxCore,
  type Coordinates,
} from "@/hooks/mapbox/useSearchBoxCore";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function VenueMap({
  mapboxId,
  image,
  name,
}: {
  mapboxId: string;
  image: string;
  name: string;
}) {
  const { retrieve } = useSearchBoxCore({ accessToken });
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [venueAddress, setVenueAddress] = useState("");

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const {
        coordinates: { longitude, latitude },
        address,
      } = data.features[0].properties;

      setCoordinates({ latitude, longitude });
      setVenueAddress(address);
    });
  }, [mapboxId]);

  return (
    <Map
      style={{ position: "absolute" }}
      mapboxAccessToken={accessToken}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      initialViewState={{ zoom: 13 }}
      {...coordinates}
    >
      {coordinates && (
        <Marker {...coordinates} anchor="bottom-right">
          <Card variant="marker">
            <CardBody>
              <Flex gap="5px" p="7px 10px">
                <Avatar image={image} name="" />
                <Flex direction="column" gap="3px">
                  <h4>{name}</h4>
                  <address className={css({ textStyle: "body.3" })}>
                    {venueAddress}
                  </address>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Marker>
      )}
    </Map>
  );
}
