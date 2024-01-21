import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import { Place, PlaceResource } from "@prisma/client";
import { Field, FieldProps, Form, Formik } from "formik";
import * as mapboxgl from "mapbox-gl";
import moment from "moment/moment";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { trpc } from "@/utils/trpc.ts";
import marker from "~/public/img/apple-touch-icon.png";
import "mapbox-gl/dist/mapbox-gl.css";

export const EventDateAndPlaceSchema = z.object({
  date: z.string(),
  time: z.string(),
  placeId: z.string(),
  guests: z.number().min(3),
});

export function NewEventDateAndPlace({
  dateAndPlace,
  setDateAndPlace,
  activeStep,
  setActiveStep,
}: {
  dateAndPlace?: z.infer<typeof EventDateAndPlaceSchema>;
  setDateAndPlace?: Dispatch<
    SetStateAction<z.infer<typeof EventDateAndPlaceSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  const [placeId, setPlaceId] = useState<string>("");
  const { data } = trpc.places.all.useQuery();
  const { data: featuredPlace } = trpc.places.get.useQuery({
    placeId,
  });

  const [popupInfo, setPopupInfo] = useState<
    (Place & { resources: PlaceResource[] }) | null
  >(null);

  return (
    <Formik
      initialValues={
        dateAndPlace || {
          date: moment().format("yyyy-MM-DD"),
          time: moment().format("HH:mm"),
          placeId: "",
          guests: 3,
        }
      }
      validationSchema={toFormikValidationSchema(EventDateAndPlaceSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setDateAndPlace && setDateAndPlace(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "35%"]} px={5}>
              <HStack w={"full"}>
                <Field name="date">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        !!form.errors.date?.length &&
                        form.touched.date !== undefined
                      }
                    >
                      <FormLabel>{t("events.new_event_date")}</FormLabel>
                      <Input type={"date"} variant={"brand"} {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="time">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        !!form.errors.time?.length &&
                        form.touched.time !== undefined
                      }
                    >
                      <FormLabel>{t("events.new_event_time")}</FormLabel>
                      <Input type={"time"} variant={"brand"} {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>
              <Field name="guests">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.guests?.length &&
                      form.touched.guests !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_guests_num")}</FormLabel>
                    <HStack maxW="320px">
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: "guests",
                              value: field.value + 1,
                            },
                          })
                        }
                      >
                        <BiPlus size={36} />
                      </Button>
                      <Input type={"number"} variant={"brand"} {...field} />
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: "guests",
                              value: field.value - 1,
                            },
                          })
                        }
                      >
                        <BiMinus size={36} />
                      </Button>
                    </HStack>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {featuredPlace && (
                <Card w={"full"}>
                  <CardBody>
                    <Flicking hideBeforeInit={true}>
                      {featuredPlace.resources.map((resource) => (
                        <Image src={resource.url} width={"full"} />
                      ))}
                    </Flicking>
                  </CardBody>
                  <CardFooter pt={0}>
                    <HStack>
                      <Image src={"/img/location.svg"} w={4} />
                      <Text>{featuredPlace.location}</Text>
                    </HStack>
                  </CardFooter>
                </Card>
              )}
            </VStack>
            <VStack w={["full", "full", "65%"]} px={5}>
              <Field name="placeId">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.placeId?.length &&
                      form.touched.placeId !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_place")}</FormLabel>
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
                      {data?.map((place, index) => (
                        <Marker
                          key={`marker-${index}`}
                          longitude={place.coordsLng}
                          latitude={place.coordsLat}
                          anchor="center"
                          onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            field.onChange({
                              target: {
                                name: "placeId",
                                value: place.id,
                              },
                            });
                            setPlaceId(place.id);
                            setPopupInfo(place);
                          }}
                        >
                          <NextImage
                            src={marker}
                            alt={place.name || "Location"}
                            width={32}
                          />
                        </Marker>
                      ))}
                      {popupInfo && (
                        <Popup
                          anchor="top"
                          longitude={Number(popupInfo.coordsLng)}
                          latitude={Number(popupInfo.coordsLat)}
                          onClose={() => setPopupInfo(null)}
                        >
                          <div>{popupInfo.location}</div>
                          {popupInfo.resources.map((resource) => (
                            <Image key={resource.id} src={resource.url} />
                          ))}
                        </Popup>
                      )}
                    </Map>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
          </Flex>
          <HStack w={"full"} justifyContent={"center"}>
            {activeStep !== 0 ? (
              <Button
                variant={"secondary"}
                onClick={() => {
                  setActiveStep && setActiveStep((activeStep || 0) - 1);
                  setDateAndPlace && setDateAndPlace(dateAndPlace);
                }}
              >
                {t("events.new_event_prev")}
              </Button>
            ) : null}
            <Button
              variant={"primary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("events.new_event_done")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
