'use client'

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Skeleton,
  SimpleGrid,
  Highlight
} from '@chakra-ui/react'
import Link from 'next/link'
import {signIn, useSession} from 'next-auth/react'
import {Stripes} from 'components/common/stripes'
import {useLocale} from 'utils/use-locale'

export function HeroContent() {
  const {t} = useLocale()
  const {status} = useSession()

  return (
    <Flex
      background={`
        url(/img/parallax-1.png) no-repeat center center, 
        url(/img/main.jpg) no-repeat center center`}
      backgroundAttachment="fixed, scroll"
      backgroundSize="contain,cover"
      h={useBreakpointValue({md: '100vh', base: '80vh'})}
      pt={24}
    >
      <VStack
        bgGradient="linear(to-r, blackAlpha.100, transparent)"
        justify="center"
        px={useBreakpointValue({base: 4, md: 8})}
        textAlign="center"
        w="full"
      >
        <Stack align="flex-start" maxW="2xl" spacing={6}>
          <Text
            color="white"
            fontSize={['4xl']}
            fontWeight={700}
            lineHeight={1.2}
            marginX="auto"
            textAlign="left"
            whiteSpace="pre"
          >
            <Highlight
              query={['Organize', 'choose', 'earn']}
              styles={{color: 'brand.primary', fontWeight: 'bold'}}
            >
              {t('hero.slug')}
            </Highlight>
          </Text>
          <Stripes />
          <Text
            color="white"
            fontSize={useBreakpointValue({base: 'xl', md: '2xl'})}
            fontWeight={300}
            lineHeight={1.2}
            marginX="auto"
          >
            <Highlight
              query={t('company')}
              styles={{color: 'brand.primary', fontWeight: 'bold'}}
            >
              {t('hero.description')}
            </Highlight>
          </Text>
          <Skeleton isLoaded={status !== 'loading'} marginX="auto" my={10}>
            <SimpleGrid columns={[1, 2]} spacing={5}>
              <Button as={Link} href="/events" variant="primary">
                {t('hero.view_events')}
              </Button>
              {status === 'authenticated' ? (
                <Button as={Link} href="/events/create" variant="primary">
                  {t('hero.create_event')}
                </Button>
              ) : (
                <Button onClick={() => signIn()} variant="primary">
                  {t('hero.sign_up')}
                </Button>
              )}
            </SimpleGrid>
          </Skeleton>
        </Stack>
      </VStack>
    </Flex>
  )
}
