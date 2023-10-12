import {
  Heading,
  Text,
  Avatar,
  useColorModeValue,
  LinkOverlay,
  LinkBox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AspectRatio,
  AvatarGroup,
  Button,
  Flex,
  Skeleton
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {useTranslations} from 'next-intl'
import {trpc} from 'utils/trpc'

export function EventCard({
  event
}: {
  event: {
    id: string
    topic: string
    description: string
    poster: string | null
    starts: Date
    takenPlace: boolean
  }
}) {
  const t = useTranslations()
  const {status} = useSession()
  const {isLoading: attendTheEventLoading, mutateAsync: attendTheEvent} =
    trpc.event.attendTheEvent.mutate()
  const {
    isLoading: cancelEventRegistrationLoading,
    mutateAsync: cancelEventRegistration
  } = trpc.event.cancelEventRegistration.mutate()
  const {data: isPresentOnEvent, refetch: isPresentOnEventRefetch} =
    trpc.event.isPresentOnEvent.useQuery({
      eventId: event.id
    })
  const {
    data: participants,
    isLoading: participantsLoading,
    refetch: participantsRrefetch
  } = trpc.event.usersOnEvent.useInfiniteQuery(
    {limit: 10, eventId: event.id},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  return (
    <Card
      key={event.id}
      boxShadow={['md', '2xl']}
      maxW="sm"
      mx={5}
      rounded="md"
    >
      <CardHeader bg={useColorModeValue('white', 'gray.900')} p={0}>
        <AspectRatio maxHeight={250} ratio={16 / 9}>
          <Image
            alt={event.topic}
            height={480}
            src={event.poster ?? ''}
            style={{
              objectFit: 'cover',
              borderRadius: '6px 6px 0 0'
            }}
            width={640}
          />
        </AspectRatio>
      </CardHeader>
      <CardBody pt={6}>
        <LinkBox>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontFamily="body"
            fontSize="2xl"
          >
            <LinkOverlay as={Link} href={`/events/${event.id}`}>
              {event.topic}
            </LinkOverlay>
          </Heading>
          <Text>{event.starts.toLocaleDateString()}</Text>
          <Text color="gray.500" mt={2} textAlign="left">
            {event.description}
          </Text>
        </LinkBox>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" w="full">
          {status === 'authenticated' && !event.takenPlace ? (
            isPresentOnEvent ? (
              <Button
                isLoading={cancelEventRegistrationLoading}
                onClick={() => {
                  void cancelEventRegistration({eventId: event.id})
                    .then(() => isPresentOnEventRefetch())
                    .then(() => participantsRrefetch())
                }}
                variant="primary"
              >
                {t('events.cancel')}
              </Button>
            ) : (
              <Button
                disabled
                isLoading={attendTheEventLoading}
                onClick={() => {
                  void attendTheEvent({eventId: event.id})
                    .then(() => isPresentOnEventRefetch())
                    .then(() => participantsRrefetch())
                }}
                variant="primary"
              >
                {t('events.join')}
              </Button>
            )
          ) : null}
          <Skeleton isLoaded={!participantsLoading}>
            <AvatarGroup max={2}>
              {participants?.pages[0].items.map((participant) => (
                <Avatar
                  key={participant.eventId + participant.user.id}
                  name={participant.user.name ?? undefined}
                  src={participant.user.image ?? undefined}
                />
              ))}
            </AvatarGroup>
          </Skeleton>
        </Flex>
      </CardFooter>
    </Card>
  )
}
