import {Container, Heading, SimpleGrid} from '@chakra-ui/react'
import {useTranslations} from 'next-intl'
import {Stripes} from 'components/common/stripes'
import {SpeakerCard} from 'components/home/bestSpeakers/speakerCard'
import {trpcServer} from 'utils/trpc'

export async function BestSpeakersSection() {
  const t = useTranslations()
  const speakers = await trpcServer.speaker.bestSpeakers.query()
  return (
    <Container
      maxWidth="100%"
      py={16}
      style={{
        background:
          '#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain'
      }}
    >
      <Heading variant="brand">{t('best_speakers.title')}</Heading>
      <Stripes />
      <SimpleGrid columns={[1, 3]} maxW="4xl" mx="auto" spacing={10}>
        {speakers?.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
