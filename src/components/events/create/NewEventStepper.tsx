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
  useSteps
} from '@chakra-ui/react'
import {useState} from 'react'
import {z} from 'zod'
import {
  EventDateAndPlaceSchema,
  NewEventDateAndPlace
} from 'components/events/create/NewEventDateAndPlace'
import {
  EventDetailsSchema,
  NewEventDetails
} from 'components/events/create/NewEventDetails'
import {NewEventReview} from 'components/events/create/NewEventReview'
import {useLocale} from 'utils/use-locale'

export function NewEventStepper() {
  const [details, setDetails] = useState<z.infer<typeof EventDetailsSchema>>()
  const [dateAndPlace, setDateAndPlace] =
    useState<z.infer<typeof EventDateAndPlaceSchema>>()

  const {t} = useLocale()
  const steps = [
    {
      title: t('events.new_event_details'),
      description: t('events.new_event_details_description')
    },
    {
      title: t('events.new_event_date_place'),
      description: t('events.new_event_date_place_description')
    },
    {
      title: t('events.new_event_review'),
      description: t('events.new_event_review_description')
    }
  ]
  const {activeStep, setActiveStep} = useSteps({
    index: 0,
    count: steps.length
  })

  return (
    <Container maxWidth={['full', 'full', '70%']} px={0} py={16}>
      <Heading py={8} textAlign="center">
        {t('events.new_event_creating')}
      </Heading>
      <Stepper
        colorScheme="brand"
        gap="0"
        height="auto"
        index={activeStep}
        mx="auto"
        orientation={useBreakpointValue(['vertical', 'vertical', 'horizontal'])}
        px={5}
      >
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                active={<StepNumber />}
                complete={<StepIcon color="black" />}
                incomplete={<StepNumber />}
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
          activeStep={activeStep}
          details={details}
          setActiveStep={setActiveStep}
          setDetails={setDetails}
        />
      )}
      {activeStep === 1 && (
        <NewEventDateAndPlace
          activeStep={activeStep}
          dateAndPlace={dateAndPlace}
          setActiveStep={setActiveStep}
          setDateAndPlace={setDateAndPlace}
        />
      )}
      {activeStep === 2 && (
        <NewEventReview
          activeStep={activeStep}
          dateAndPlace={dateAndPlace}
          details={details}
          setActiveStep={setActiveStep}
        />
      )}
    </Container>
  )
}
