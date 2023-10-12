import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Tag,
  Text,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function EventDetailsSection({eventId}: {eventId: string}) {
  const {t} = useLocale()
  const {status: userStatus} = useSession()
  const {isLoading: attendTheEventLoading, mutateAsync: attendTheEvent} =
    trpc.event.attendTheEvent.useMutation()
  const {
    isLoading: cancelEventRegistrationLoading,
    mutateAsync: cancelEventRegistration
  } = trpc.event.cancelEventRegistration.useMutation()
  const {data: isPresentOnEvent, refetch: isPresentOnEventRefetch} =
    trpc.event.isPresentOnEvent.useQuery({
      eventId
    })
  const {data, status} = trpc.event.getEventDetails.useQuery({eventId})
  return (
    <Container
      maxWidth="100%"
      pt={32}
      py={16}
      style={{
        background:
          'url(/img/stars.png) repeat center center, #2a2a2a url(/img/main-dark.png) no-repeat center 0',
        backgroundAttachment: 'fixed, scroll',
        backgroundSize: 'contain, cover',
        color: 'white'
      }}
    >
      <Skeleton isLoaded={status === 'success'}>
        <SimpleGrid
          alignItems="center"
          columns={[1, 1, 1, 2]}
          mx="auto"
          w={['full', '70%']}
        >
          <Image src={data?.poster || undefined} />
          <VStack w="full">
            <Heading pt={[5, 0]} textAlign="center">
              {data?.topic}
            </Heading>
            <HStack py={7}>
              {data?.tags?.map((tag) => (
                <Tag
                  key={tag}
                  background="transparent"
                  border="2px solid rgb(123, 123, 123)"
                  borderRadius="full"
                  color="gray.100"
                  px={4}
                  py={2}
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
            <SimpleGrid columns={2} mx="auto" w={['full', '80%']}>
              <VStack alignItems={['center', 'baseline']} spacing={5}>
                <HStack>
                  <Image src="/img/calendar.png" />
                  <Text>{data?.starts?.toLocaleDateString()}</Text>
                </HStack>
                <HStack>
                  <Image src="/img/time.png" />
                  <Text>{data?.starts?.toLocaleTimeString()}</Text>
                </HStack>
                <HStack>
                  <Image src="/img/place.png" />
                  <Text as={Link} href={`/places/${data?.place?.id}`}>
                    {data?.place?.location}
                  </Text>
                </HStack>
              </VStack>
              <VStack alignItems={['center', 'baseline']} spacing={5}>
                {data?.speakersOnEvent?.map(({speaker}) => (
                  <HStack key={speaker.userId}>
                    <Image src="/img/speak.png" />
                    <Text as={Link} href={`/speakers/${speaker.id}`}>
                      {speaker.user.name}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </SimpleGrid>
            <Flex justifyContent="center" mt={5} mx="auto" w="full">
              {userStatus === 'authenticated' && !data?.takenPlace ? (
                isPresentOnEvent ? (
                  <Button
                    color="black"
                    isLoading={cancelEventRegistrationLoading}
                    onClick={() => {
                      void cancelEventRegistration({
                        eventId
                      }).then(() => isPresentOnEventRefetch())
                    }}
                    variant="primary"
                  >
                    {t('events.cancel')}
                  </Button>
                ) : (
                  <Button
                    color="black"
                    disabled
                    isLoading={attendTheEventLoading}
                    onClick={() => {
                      void attendTheEvent({eventId}).then(() =>
                        isPresentOnEventRefetch()
                      )
                    }}
                    variant="primary"
                  >
                    {t('events.join')}
                  </Button>
                )
              ) : null}
            </Flex>
          </VStack>
        </SimpleGrid>
        <VStack display="block" mt={5} mx="auto" w={['full', '70%']}>
          <Text />
          <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem border={0}>
              <AccordionButton>
                <VStack alignItems="left" as="span" flex="1" textAlign="left">
                  <Heading variant="eventDescription">
                    {t('events.meeting_about')}
                  </Heading>
                  <Divider my={3} variant="eventDetails" />
                </VStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} w={['full', '80%']}>
                {data?.description}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Skeleton>
    </Container>
  )
}
