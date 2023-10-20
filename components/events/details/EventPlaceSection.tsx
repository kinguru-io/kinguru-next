import {
  Container,
  Heading,
  Flex,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import * as mapboxgl from "mapbox-gl";
import NextImage from "next/image";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { Stripes } from "@/components/common/stripes";
import marker from "@/public/img/apple-touch-icon.png";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";
import "mapbox-gl/dist/mapbox-gl.css";

export const EventPlaceSection = ({ eventId }: { eventId: string }) => {
  const { t } = useLocale();
  const { data: place } = trpc.event.getEventPlace.useQuery({
    eventId,
  });

  return (
    <Container
      maxWidth={"100%"}
      py={16}
      px={0}
      style={{
        background:
          "#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <Heading variant={"brand"}>{t("events.meeting_place")}</Heading>
      <Stripes />
      <Flex w={["full", "70%"]} px={3} mx={"auto"}>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapLib={mapboxgl}
          initialViewState={{
            longitude: 21,
            latitude: 52.23,
            zoom: 11,
            bearing: 0,
            pitch: 0,
          }}
          style={{ width: "100%", height: 400 }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <Marker
            longitude={place?.coordsLng || 21}
            latitude={place?.coordsLat || 52.23}
            anchor="center"
          >
            <NextImage
              src={marker}
              alt={place?.name || "Location"}
              width={32}
            />
          </Marker>
          <VStack
            position={"absolute"}
            top={0}
            right={0}
            p={4}
            alignItems={"left"}
            maxW={"sm"}
            backgroundColor={"rgba(0,0,0,.1)"}
            roundedBottomLeft={"xl"}
          >
            <Heading color={"white"}>{place?.name}</Heading>
            <Text color={"white"}>{place?.location}</Text>
            <Flicking>
              {place?.resources.map((resource) => (
                <Image
                  key={resource.id}
                  src={resource.url}
                  alt={place.name}
                  height={200}
                />
              ))}
            </Flicking>
          </VStack>
        </Map>
      </Flex>
    </Container>
  );
};
