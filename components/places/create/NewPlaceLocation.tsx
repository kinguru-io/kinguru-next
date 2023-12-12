import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { Field, FieldProps, Form, Formik } from "formik";
import * as mapboxgl from "mapbox-gl";
import NextImage from "next/image";
import { Dispatch, SetStateAction, useRef } from "react";
import Map, { MapRef, Marker } from "react-map-gl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import marker from "@/public/img/apple-touch-icon.png";
import { useSearchBoxCore } from "@/utils/mapbox/useSearchBoxCore";
import { useLocale } from "@/utils/use-locale.ts";
import "mapbox-gl/dist/mapbox-gl.css";

export const PlaceLocationSchema = z.object({
  locationMapboxId: z.string(),
  billingMapboxId: z.string().optional(),
  useSameAddress: z.boolean().default(false),
  isMarkerSet: z.boolean().optional(),
  currentMarker: z.array(z.number()).max(2).default([21, 52.23]),
  routeToPremises: z.string().optional(),
});

export function NewPlaceLocation({
  location,
  setLocation,
  activeStep,
  setActiveStep,
}: {
  location?: z.infer<typeof PlaceLocationSchema>;
  setLocation?: Dispatch<
    SetStateAction<z.infer<typeof PlaceLocationSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();
  const mapRef = useRef<MapRef>(null);
  const { fetchSuggestions, retrieve } = useSearchBoxCore({});
  return (
    <Formik
      initialValues={
        location || {
          locationMapboxId: "",
          useSameAddress: true,
          isMarkerSet: false,
          currentMarker: [21, 52.23],
        }
      }
      validationSchema={toFormikValidationSchema(PlaceLocationSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setLocation && setLocation(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} px={5}>
              <Field name="locationMapboxId">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.locationMapboxId?.length &&
                      form.touched.locationMapboxId !== undefined
                    }
                  >
                    <FormLabel>{t("places.new_place_location")}</FormLabel>
                    <AsyncSelect
                      variant={"brand"}
                      onChange={(suggestion) => {
                        retrieve(suggestion, (data) => {
                          mapRef.current?.setCenter(
                            data.features[0].geometry.coordinates as [
                              number,
                              number,
                            ],
                          );
                          mapRef.current?.setZoom(16);
                          void form.setFieldValue("isMarkerSet", true);
                          void form.setFieldValue(
                            "currentMarker",
                            data.features[0].geometry.coordinates,
                          );
                        });
                        field.onChange({
                          target: {
                            value: suggestion?.mapbox_id,
                            name: "locationMapboxId",
                          },
                        });
                      }}
                      loadOptions={fetchSuggestions}
                      getOptionValue={({ name }) => name}
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.new_place_location_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="useSameAddress">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.useSameAddress?.length &&
                      form.touched.useSameAddress !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.location_use_same_billing_address")}
                    </FormLabel>
                    <RadioGroup
                      name={"billing-address"}
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "useSameAddress",
                            value: value === "1",
                          },
                        })
                      }
                      defaultValue={field.value ? "1" : "0"}
                    >
                      <VStack alignItems={"flex-start"}>
                        <Radio value={"1"}>{t("places.yes")}</Radio>
                        <Radio value={"0"}>{t("places.no")}</Radio>
                      </VStack>
                    </RadioGroup>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="billingMapboxId">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.billingMapboxId?.length &&
                      form.touched.billingMapboxId !== undefined
                    }
                    isDisabled={form.values.useSameAddress}
                  >
                    <FormLabel>{t("places.new_billing_location")}</FormLabel>
                    <AsyncSelect
                      variant={"brand"}
                      onChange={(suggestion) => {
                        field.onChange({
                          target: {
                            value: suggestion?.mapbox_id,
                            name: "billingMapboxId",
                          },
                        });
                      }}
                      loadOptions={fetchSuggestions}
                      getOptionValue={({ name }) => name}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="routeToPremises">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.routeToPremises?.length &&
                      form.touched.routeToPremises !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.location_route_to_premises")}
                    </FormLabel>
                    <Textarea {...field} />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.location_route_to_premises_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Center>
              <Divider orientation="vertical" />
            </Center>
            <VStack w={["full", "full", "50%"]} px={5} pt={[5, 5, 0]}>
              <Field name="currentMarker">
                {({ field, form }: FieldProps) => (
                  <Map
                    ref={mapRef}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    mapLib={mapboxgl}
                    initialViewState={{
                      longitude: field.value[0],
                      latitude: field.value[1],
                      zoom: 16,
                      bearing: 0,
                      pitch: 0,
                    }}
                    style={{ width: "100%", height: 400 }}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                  >
                    {form.values.isMarkerSet && (
                      <Marker
                        anchor="center"
                        longitude={field.value[0]}
                        latitude={field.value[1]}
                      >
                        <NextImage src={marker} alt={"Location"} width={32} />
                      </Marker>
                    )}
                  </Map>
                )}
              </Field>
            </VStack>
          </Flex>
          <HStack w={"full"} justifyContent={"center"}>
            {activeStep !== 0 ? (
              <Button
                variant={"secondary"}
                onClick={() =>
                  setActiveStep && setActiveStep((activeStep || 0) - 1)
                }
              >
                {t("places.new_place_prev")}
              </Button>
            ) : null}
            <Button
              variant={"secondary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("places.new_place_next")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
