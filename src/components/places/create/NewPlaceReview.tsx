import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast,
  VStack,
  Image,
} from "@chakra-ui/react";
import { TRPCError } from "@trpc/server";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  PlaceFeaturesSchema,
  PlaceGeneralSchema,
  PlaceLocationSchema,
  PlaceOpenHoursSchema,
  PlacePricingSchema,
  PlaceResourcesSchema,
} from "@/components/places/create";
import { daysOfTheWeek } from "@/components/places/OpenHours";
import { trpc } from "@/utils/trpc.ts";

export function NewPlaceReview({
  features,
  general,
  location,
  openHours,
  resources,
  pricing,
  activeStep,
  setActiveStep,
}: {
  features?: z.infer<typeof PlaceFeaturesSchema>;
  general?: z.infer<typeof PlaceGeneralSchema>;
  location?: z.infer<typeof PlaceLocationSchema>;
  openHours?: z.infer<typeof PlaceOpenHoursSchema>;
  resources?: z.infer<typeof PlaceResourcesSchema>;
  pricing?: z.infer<typeof PlacePricingSchema>;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  const toast = useToast();
  const { mutateAsync: createPlace, isLoading } =
    trpc.places.createPlace.useMutation();
  const router = useRouter();
  return (
    <VStack>
      <TableContainer w={["full", "full", "50%"]} mx={"auto"} my={15}>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{t("places.general_title")}</Td>
              <Td>{general?.title}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_description")}</Td>
              <Td>{general?.description}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_type_of_premises")}</Td>
              <Td>
                {general?.typeOfPremises
                  .map(({ label }) => t(label))
                  .join(", ")}
              </Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_rules")}</Td>
              <Td>{general?.rules}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_area")}</Td>
              <Td>{general?.area}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_min_capacity")}</Td>
              <Td>{general?.minCapacity}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_max_capacity")}</Td>
              <Td>{general?.maxCapacity}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.general_age_restrictions")}</Td>
              <Td>{general?.ageRestrictions.label}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_parking_area_exists")}</Td>
              <Td>{features?.parkingAreaExists ? "true" : "false"}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_parking_area")}</Td>
              <Td>
                {features?.parkingArea.map(({ label }) => t(label)).join(", ")}
              </Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_camera_or_audio_recoding")}</Td>
              <Td>{features?.cameraOrAudioRecording ? "true" : "false"}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_does_premises_have_wifi")}</Td>
              <Td>{features?.doesPremisesHaveWifi ? "true" : "false"}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_wifi_credentials")}</Td>
              <Td>{`${features?.wifiLogin || ""}${
                features?.wifiLogin && features?.wifiPassword ? ", " : ""
              } ${
                features?.wifiPassword?.replace(/.+/gi, "********") || ""
              }`}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.features_amenities")}</Td>
              <Td>
                {features?.amenities.map(({ label }) => t(label)).join(", ")}
              </Td>
            </Tr>
            <Tr>
              <Td>{t("places.location_mapbox_id")}</Td>
              <Td>{location?.locationMapboxId}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.location_use_same_billing_address")}</Td>
              <Td>{location?.useSameAddress ? "true" : "false"}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.billing_mapbox_id")}</Td>
              <Td>{location?.billingMapboxId}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.location_route_to_premises")}</Td>
              <Td>{location?.routeToPremises}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.hours_of_premises")}</Td>
              <Td>
                {Object.keys(openHours || {}).map((day) => (
                  <div>
                    {t(`places.hours_${day}`)}:{" "}
                    {openHours
                      ? openHours[day as (typeof daysOfTheWeek)[number]]
                        ? openHours[day as (typeof daysOfTheWeek)[number]]
                            ?.map((value) => value.start + " - " + value.end)
                            .join(", ")
                        : t("places.closed")
                      : t("places.closed")}
                  </div>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>{t("places.resources_images")}</Td>
              <Td>
                {resources?.resources.map(({ url }) => (
                  <Image src={url} mb={3} border={"1px solid #0a0a0a"} />
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>{t("places.pricing_rental_price_by_hour")}</Td>
              <Td>{pricing?.rentalPriceByHour}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.pricing_cleaning_fee")}</Td>
              <Td>{pricing?.cleaningFee ? "true" : "false"}</Td>
            </Tr>
            <Tr>
              <Td>{t("places.pricing_cleaning_fee_price")}</Td>
              <Td>{pricing?.cleaningFeePrice}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack w={"full"} justifyContent={"center"}>
        {activeStep !== 0 ? (
          <Button
            variant={"secondary"}
            onClick={() => {
              setActiveStep && setActiveStep((activeStep || 0) - 1);
            }}
          >
            {t("places.new_place_prev")}
          </Button>
        ) : null}
        <Button
          variant={"primary"}
          isLoading={isLoading}
          onClick={() => {
            try {
              void createPlace({
                general: PlaceGeneralSchema.parse(general),
                features: PlaceFeaturesSchema.parse(features),
                location: PlaceLocationSchema.parse(location),
                openHours: PlaceOpenHoursSchema.parse(openHours),
                resources: PlaceResourcesSchema.parse(resources),
                pricing: PlacePricingSchema.parse(pricing),
              }).then((result) => {
                if (result instanceof TRPCError) {
                  toast({
                    title: t("places.new_places_was_not_created"),
                    description: t(
                      "places.new_places_was_not_created_description",
                    ),
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }
                toast({
                  title: t("places.new_places_was_created"),
                  description: t("places.new_places_was_created_description"),
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push(`/places/${result.id}`);
              });
            } catch (e) {
              toast({
                title: t("places.new_places_was_not_created"),
                description: t("places.new_places_was_not_created_description"),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {t("places.new_place_create_place")}
        </Button>
      </HStack>
    </VStack>
  );
}
