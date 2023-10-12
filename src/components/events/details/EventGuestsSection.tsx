import {Avatar, Container, Flex, Heading} from '@chakra-ui/react'
import Flicking from '@egjs/react-flicking'
import {useInView} from 'react-intersection-observer'
import {Stripes} from 'components/common/stripes'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function EventGuestsSection({eventId}: {eventId: string}) {
  const {t} = useLocale()
  const {
    data: users,
    fetchNextPage,
    hasNextPage
  } = trpc.event.usersOnEvent.useInfiniteQuery(
    {limit: 40, eventId},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  const {ref} = useInView({
    threshold: 0,
    onChange: (inView) =>
      inView && hasNextPage ? void fetchNextPage() : undefined
  })
  return (
    <Container
      maxWidth="100%"
      px={0}
      py={16}
      style={{
        position: 'relative',
        background:
          '#ffd800 url(/img/parallax-speakers.png) no-repeat center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain',
        color: 'black'
      }}
    >
      <Heading variant="brand">{t('events.meeting_guests')}</Heading>
      <Stripes color="white" />
      <Flex mx="auto" w="full">
        <Flicking>
          {users?.pages
            .reduce((acc, page) => ({
              items: acc.items.concat(page.items),
              nextCursor: page.nextCursor
            }))
            .items.map((user, index, allUsers) => (
              <div key={user.user.id}>
                <Avatar
                  mx={1}
                  name={user.user.name || undefined}
                  size="2xl"
                  src={user.user.image || undefined}
                />
                <div ref={index + 1 === allUsers.length ? ref : undefined} />
              </div>
            ))}
        </Flicking>
      </Flex>
    </Container>
  )
}
