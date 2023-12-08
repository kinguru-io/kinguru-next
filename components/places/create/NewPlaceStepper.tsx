import {
  Box,
  Container,
  Heading,
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
import { NewPlaceReview, NewPlaceLocation } from "@/components/places/create";
import { useLocale } from "@/utils/use-locale.ts";

export function NewPlaceStepper() {
  const { t } = useLocale();
  const steps = [
    {
      title: t("places.new_event_location"),
      description: t("places.new_places_location_description"),
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

  return (
    <Container maxWidth={["full", "full", "70%"]} py={16} px={0}>
      <Heading textAlign={"center"} py={8}>
        {t("places.new_place_creating")}
      </Heading>
      <Stepper
        mx={"auto"}
        index={activeStep}
        colorScheme="brand"
        orientation={useBreakpointValue(["vertical", "vertical", "horizontal"])}
        height="auto"
        px={5}
        gap="0"
      >
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
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
        ))}
      </Stepper>
      {activeStep === 0 && (
        <NewPlaceLocation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 1 && (
        <NewPlaceReview activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
    </Container>
  );
}
