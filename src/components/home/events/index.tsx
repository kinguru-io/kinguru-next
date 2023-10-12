import {
  Container,
  SimpleGrid,
  Skeleton,
  Text,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import {EventCard} from 'components/common/cards/eventCard'
import {Stripes} from 'components/common/stripes'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function Events() {
  const {t} = useLocale()
  const {data: upcomingEvents, status: upcomingStatus} =
    trpc.event.upcoming.useQuery()
  const {data: recentEvents, status: recentStatus} =
    trpc.event.recent.useQuery()
  const color = useColorModeValue('gray.700', 'white')
  return (
    <>
      <Container maxW="6xl" py={20}>
        <Heading variant="brand">{t('events.upcoming_events')}</Heading>
        <Stripes />
        <Skeleton isLoaded={upcomingStatus === 'success'}>
          {!upcomingEvents?.length ? (
            <Text
              color={color}
              fontFamily="body"
              fontSize="xl"
              fontWeight={400}
              textAlign="center"
            >
              {t('events.not_found')}
            </Text>
          ) : (
            <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
              {upcomingEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          )}
        </Skeleton>
        <Heading mt={10} variant="brand">
          {t('events.recent_events')}
        </Heading>
        <Stripes />
        <Skeleton isLoaded={recentStatus === 'success'}>
          {!recentEvents?.length ? (
            <Text
              color={color}
              fontFamily="body"
              fontSize="xl"
              fontWeight={400}
              textAlign="center"
            >
              {t('events.not_found')}
            </Text>
          ) : (
            <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
              {recentEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          )}
        </Skeleton>
      </Container>
    </>
  )
}
