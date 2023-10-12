import {Container, Heading, Image, SimpleGrid} from '@chakra-ui/react'
import {Arrow} from '@egjs/flicking-plugins'
import Flicking, {ViewportSlot} from '@egjs/react-flicking'
import {Stripes} from 'components/common/stripes'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function EventPlaceSection({eventId}: {eventId: string}) {
  const {t} = useLocale()
  const {data: place} = trpc.event.getEventPlace.useQuery({
    eventId
  })

  return (
    <Container
      maxWidth="100%"
      px={0}
      py={16}
      style={{
        background:
          '#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain'
      }}
    >
      <Heading variant="brand">{t('events.meeting_place')}</Heading>
      <Stripes />
      <SimpleGrid columns={[1, 2]} mx="auto" w="70%">
        <Flicking circular horizontal plugins={[new Arrow()]}>
          {place?.resources.map((photo) => (
            <Image height={photo.height} src={photo.url} width={photo.width} />
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev" slot="viewport" />
            <span className="flicking-arrow-next" slot="viewport" />
          </ViewportSlot>
        </Flicking>
      </SimpleGrid>
    </Container>
  )
}
