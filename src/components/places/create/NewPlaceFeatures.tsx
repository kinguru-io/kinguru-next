import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  FormHelperText,
  Card,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CreatableSelect, Select } from "chakra-react-select";
import { Field, FieldProps, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const PlaceFeaturesSchema = z.object({
  parkingAreaExists: z.boolean(),
  parkingArea: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  cameraOrAudioRecording: z.boolean().optional(),
  doesPremisesHaveWifi: z.boolean(),
  wifiLogin: z.string().min(3).optional(),
  wifiPassword: z.string().min(8).optional(),
  amenities: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

export function NewPlaceFeatures({
  features,
  setFeatures,
  activeStep,
  setActiveStep,
}: {
  features?: z.infer<typeof PlaceFeaturesSchema>;
  setFeatures?: Dispatch<
    SetStateAction<z.infer<typeof PlaceFeaturesSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  const parkingAreaOptions = [
    {
      value: "free_on_site",
      label: t("places.parking_area_options.free_on_site"),
    },
    {
      value: "paid_on_site",
      label: t("places.parking_area_options.paid_on_site"),
    },
    {
      value: "free_street",
      label: t("places.parking_area_options.free_street"),
    },
    {
      value: "paid_street",
      label: t("places.parking_area_options.free_street"),
    },
    {
      value: "valet_parking",
      label: t("places.parking_area_options.valet_parking"),
    },
    {
      value: "paid_nearby",
      label: t("places.parking_area_options.paid_nearby"),
    },
  ];

  const amenitiesOptions = [
    {
      value: "wifi",
      label: t("places.amenities_options.wifi"),
    },
    {
      value: "conference_phone",
      label: t("places.amenities_options.conference_phone"),
    },
    {
      value: "speakers",
      label: t("places.amenities_options.speakers"),
    },
    {
      value: "microphones",
      label: t("places.amenities_options.microphones"),
    },
    {
      value: "video_equipment",
      label: t("places.amenities_options.video_equipment"),
    },
    {
      value: "soundproofing",
      label: t("places.amenities_options.soundproofing"),
    },
    {
      value: "lighting_equipment",
      label: t("places.amenities_options.lighting_equipment"),
    },
    {
      value: "natural_light",
      label: t("places.amenities_options.natural_light"),
    },
    {
      value: "light_blocking_curtains",
      label: t("places.amenities_options.light_blocking_curtains"),
    },
    {
      value: "projector",
      label: t("places.amenities_options.projector"),
    },
    {
      value: "screen_for_projector",
      label: t("places.amenities_options.screen_for_projector"),
    },
    {
      value: "monitor",
      label: t("places.amenities_options.monitor"),
    },
    {
      value: "green_screen",
      label: t("places.amenities_options.green_screen"),
    },
    {
      value: "magnetic_board",
      label: t("places.amenities_options.magnetic_board"),
    },
    {
      value: "chalk_board",
      label: t("places.amenities_options.chalk_board"),
    },
    {
      value: "flipcharts",
      label: t("places.amenities_options.flipcharts"),
    },
    {
      value: "printer",
      label: t("places.amenities_options.printer"),
    },
    {
      value: "apple_tv",
      label: t("places.amenities_options.apple_tv"),
    },
    {
      value: "scene",
      label: t("places.amenities_options.scene"),
    },
    {
      value: "tables",
      label: t("places.amenities_options.tables"),
    },
    {
      value: "chairs",
      label: t("places.amenities_options.chairs"),
    },
    {
      value: "tablecloths",
      label: t("places.amenities_options.tablecloths"),
    },
    {
      value: "plates_and_cutlery",
      label: t("places.amenities_options.plates_and_cutlery"),
    },
    {
      value: "kitchen",
      label: t("places.amenities_options.kitchen"),
    },
    {
      value: "coffee",
      label: t("places.amenities_options.coffee"),
    },
    {
      value: "wardrobe",
      label: t("places.amenities_options.wardrobe"),
    },
    {
      value: "clothes_hangers",
      label: t("places.amenities_options.clothes_hangers"),
    },
    {
      value: "steamer",
      label: t("places.amenities_options.steamer"),
    },
    {
      value: "restrooms",
      label: t("places.amenities_options.restrooms"),
    },
    {
      value: "sink",
      label: t("places.amenities_options.sink"),
    },
    {
      value: "view_windows",
      label: t("places.amenities_options.view_windows"),
    },
    {
      value: "dormer_windows",
      label: t("places.amenities_options.dormer_windows"),
    },
    {
      value: "attic",
      label: t("places.amenities_options.attic"),
    },
    {
      value: "meeting_room",
      label: t("places.amenities_options.meeting_room"),
    },
    {
      value: "freight_elevators",
      label: t("places.amenities_options.freight_elevators"),
    },
    {
      value: "open_area",
      label: t("places.amenities_options.open_area"),
    },
    {
      value: "access_from_street_level",
      label: t("places.amenities_options.access_from_street_level"),
    },
    {
      value: "van_accessible",
      label: t("places.amenities_options.van_accessible"),
    },
    {
      value: "parking_places",
      label: t("places.amenities_options.parking_places"),
    },
    {
      value: "proximity_to_public_transport",
      label: t("places.amenities_options.proximity_to_public_transport"),
    },
    {
      value: "audiovisual_specialist",
      label: t("places.amenities_options.audiovisual_specialist"),
    },
    {
      value: "security",
      label: t("places.amenities_options.security"),
    },
    {
      value: "cleaning_services",
      label: t("places.amenities_options.cleaning_services"),
    },
  ];

  const [showWifiPassword, setShowWifiPassword] = useState(false);

  return (
    <Formik
      initialValues={
        features || {
          parkingAreaExists: false,
          parkingArea: [],
          cameraOrAudioRecording: undefined,
          doesPremisesHaveWifi: false,
          wifiLogin: undefined,
          wifiPassword: undefined,
          amenities: [],
        }
      }
      validationSchema={toFormikValidationSchema(PlaceFeaturesSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setFeatures && setFeatures(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} mx={"auto"} px={5} spacing={7}>
              <Field name="parkingAreaExists">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.parkingAreaExists?.length &&
                      form.touched.parkingAreaExists !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.features_parking_area_exists")}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "parkingAreaExists",
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
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.features_parking_area_exists_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="parkingArea">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.parkingArea?.length &&
                      form.touched.parkingArea !== undefined
                    }
                    isDisabled={!form.values.parkingAreaExists}
                  >
                    <FormLabel>{t("places.features_parking_area")}</FormLabel>
                    <Select
                      isMulti
                      variant={"brand"}
                      options={parkingAreaOptions}
                      value={field.value}
                      onChange={(values) =>
                        field.onChange({
                          target: {
                            name: "parkingArea",
                            value: values,
                          },
                        })
                      }
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.features_parking_area_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cameraOrAudioRecording">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.cameraOrAudioRecording?.length &&
                      form.touched.cameraOrAudioRecording !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.features_camera_or_audio_recoding")}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "cameraOrAudioRecording",
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
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.features_camera_or_audio_recoding_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="doesPremisesHaveWifi">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.doesPremisesHaveWifi?.length &&
                      form.touched.doesPremisesHaveWifi !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.features_does_premises_have_wifi")}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "doesPremisesHaveWifi",
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

              <Field name="wifiCredentials">
                {({ form: credentialsForm }: FieldProps) => (
                  <FormControl
                    isDisabled={!credentialsForm.values.doesPremisesHaveWifi}
                  >
                    <FormLabel>
                      {t("places.features_wifi_credentials")}
                    </FormLabel>
                    <Card>
                      <VStack py={2} px={4} spacing={5}>
                        <Field name="wifiLogin">
                          {({ field, form, meta }: FieldProps) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.wifiLogin?.length &&
                                form.touched.wifiLogin !== undefined
                              }
                              isDisabled={!form.values.doesPremisesHaveWifi}
                            >
                              <FormLabel>
                                {t("places.features_wifi_login")}
                              </FormLabel>
                              <Input variant={"brand"} {...field} />
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="wifiPassword">
                          {({ field, form, meta }: FieldProps) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.wifiPassword?.length &&
                                form.touched.wifiPassword !== undefined
                              }
                              isDisabled={!form.values.doesPremisesHaveWifi}
                            >
                              <FormLabel>
                                {t("places.features_wifi_password")}
                              </FormLabel>
                              <InputGroup>
                                <Input
                                  variant={"brand"}
                                  type={showWifiPassword ? "text" : "password"}
                                  {...field}
                                />
                                <InputRightElement width="4.5rem">
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() =>
                                      setShowWifiPassword(!showWifiPassword)
                                    }
                                    isDisabled={
                                      !form.values.doesPremisesHaveWifi
                                    }
                                  >
                                    {showWifiPassword ? <BiHide /> : <BiShow />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </VStack>
                    </Card>
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.features_wifi_credentials_helper")}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="amenities">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.amenities?.length &&
                      form.touched.amenities !== undefined
                    }
                  >
                    <FormLabel>{t("places.features_amenities")}</FormLabel>
                    <CreatableSelect
                      isMulti
                      variant={"brand"}
                      options={amenitiesOptions}
                      value={field.value}
                      onChange={(values) =>
                        field.onChange({
                          target: {
                            name: "amenities",
                            value: values,
                          },
                        })
                      }
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.features_amenities_helper")}
                    </FormHelperText>
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
