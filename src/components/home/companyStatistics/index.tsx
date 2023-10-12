import {Container, Heading, SimpleGrid, Text} from '@chakra-ui/react'
import {Stripes} from 'components/common/stripes'
import {useLocale} from 'utils/use-locale'

export function CompanyStatisticsSection() {
  const {t} = useLocale()
  return (
    <Container bgColor="brand.primary" maxWidth="full" py={20}>
      <SimpleGrid columns={[1, 3]} maxWidth="5xl" mx="auto">
        <div>
          <Heading fontSize="5xl" variant="brand">
            50+
          </Heading>
          <Stripes color="#fff" mb="30px" mt="30px" />
          <Text fontSize="3xl" textAlign="center">
            {t('company_statistics.events_held')}
          </Text>
        </div>
        <div>
          <Heading fontSize="5xl" variant="brand">
            100+
          </Heading>
          <Stripes color="#fff" mb="30px" mt="30px" />
          <Text fontSize="3xl" textAlign="center">
            {t('company_statistics.speakers')}
          </Text>
        </div>
        <div>
          <Heading fontSize="5xl" variant="brand">
            150+
          </Heading>
          <Stripes color="#fff" mb="30px" mt="30px" />
          <Text fontSize="3xl" textAlign="center">
            {t('company_statistics.connected_establishments')}
          </Text>
        </div>
      </SimpleGrid>
    </Container>
  )
}
