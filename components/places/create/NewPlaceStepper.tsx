import {
  Box,
  Container,
  Heading,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useBreakpointValue,
  useSteps,
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import {
  NewPlaceFeatures,
  NewPlaceGeneral,
  NewPlaceLocation,
  NewPlaceOpenHours,
  NewPlacePricing,
  NewPlaceResources,
  NewPlaceReview,
  PlaceFeaturesSchema,
  PlaceGeneralSchema,
  PlaceLocationSchema,
  PlaceOpenHoursSchema,
  PlacePricingSchema,
} from "@/components/places/create";
import { PlaceResourcesSchema } from "@/components/places/create/NewPlaceResources.tsx";
import { useLocale } from "@/utils/use-locale.ts";

export function NewPlaceStepper() {
  const { t } = useLocale();
  const steps = [
    {
      title: t("places.new_place_general"),
      description: t("places.new_place_general_description"),
    },
    {
      title: t("places.new_place_features"),
      description: t("places.new_place_features_description"),
    },
    {
      title: t("places.new_event_location"),
      description: t("places.new_places_location_description"),
    },
    {
      title: t("places.new_event_open_hours"),
      description: t("places.new_event_open_hours_description"),
    },
    {
      title: t("places.new_event_resources"),
      description: t("places.new_event_resources_description"),
    },
    {
      title: t("places.new_event_pricing"),
      description: t("places.new_event_pricing_description"),
    },
    {
      title: t("places.new_place_review"),
      description: t("places.new_place_review_description"),
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [general, setGeneral] = useState<z.infer<typeof PlaceGeneralSchema>>();
  const [features, setFeatures] =
    useState<z.infer<typeof PlaceFeaturesSchema>>();
  const [location, setLocation] =
    useState<z.infer<typeof PlaceLocationSchema>>();
  const [openHours, setOpenHours] =
    useState<z.infer<typeof PlaceOpenHoursSchema>>();
  const [resources, setResources] =
    useState<z.infer<typeof PlaceResourcesSchema>>();
  const [pricing, setPricing] = useState<z.infer<typeof PlacePricingSchema>>();

  return (
    <Container
      maxWidth={["full", "full", "70%"]}
      py={16}
      px={0}
      position={"relative"}
    >
      <Heading textAlign={"center"} py={8}>
        {t("places.new_place_creating")}
      </Heading>
      <Stepper
        mx={"auto"}
        display={"block"}
        index={activeStep}
        colorScheme="brand"
        orientation={useBreakpointValue(["vertical", "vertical", "horizontal"])}
        height="auto"
        px={5}
        gap="0"
        textAlign={["left", "left", "center"]}
      >
        {steps.map((step, index) => (
          <Stack
            key={index}
            w={"auto"}
            display={"inline-block"}
            textAlign={"left"}
          >
            <Step onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon color={"black"} />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          </Stack>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <NewPlaceGeneral
          general={general}
          setGeneral={setGeneral}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 1 && (
        <NewPlaceFeatures
          features={features}
          setFeatures={setFeatures}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 2 && (
        <NewPlaceLocation
          location={location}
          setLocation={setLocation}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 3 && (
        <NewPlaceOpenHours
          openHours={openHours}
          setOpenHours={setOpenHours}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 4 && (
        <NewPlaceResources
          resources={resources}
          setResources={setResources}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 5 && (
        <NewPlacePricing
          pricing={pricing}
          setPricing={setPricing}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 6 && (
        <NewPlaceReview
          general={general}
          features={features}
          location={location}
          openHours={openHours}
          resources={resources}
          pricing={pricing}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </Container>
  );
}
