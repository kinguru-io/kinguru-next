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
import { useState } from "react";
import { z } from "zod";
import {
  EventDateAndPlaceSchema,
  NewEventDateAndPlace,
} from "@/components/events/create/NewEventDateAndPlace.tsx";
import {
  EventDetailsSchema,
  NewEventDetails,
} from "@/components/events/create/NewEventDetails.tsx";
import { NewEventReview } from "@/components/events/create/NewEventReview.tsx";
import { useLocale } from "@/utils/use-locale.ts";

export function NewEventStepper() {
  const [details, setDetails] = useState<z.infer<typeof EventDetailsSchema>>();
  const [dateAndPlace, setDateAndPlace] =
    useState<z.infer<typeof EventDateAndPlaceSchema>>();

  const { t } = useLocale();
  const steps = [
    {
      title: t("events.new_event_details"),
      description: t("events.new_event_details_description"),
    },
    {
      title: t("events.new_event_date_place"),
      description: t("events.new_event_date_place_description"),
    },
    {
      title: t("events.new_event_review"),
      description: t("events.new_event_review_description"),
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Container maxWidth={["full", "full", "70%"]} py={16} px={0}>
      <Heading textAlign={"center"} py={8}>
        {t("events.new_event_creating")}
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
        <NewEventDetails
          details={details}
          setDetails={setDetails}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 1 && (
        <NewEventDateAndPlace
          dateAndPlace={dateAndPlace}
          setDateAndPlace={setDateAndPlace}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 2 && (
        <NewEventReview
          details={details}
          dateAndPlace={dateAndPlace}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </Container>
  );
}
