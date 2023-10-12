import {Container, SimpleGrid, VStack, Link} from '@chakra-ui/react'
import Image from 'next/image'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa6'
import {useLocale} from 'utils/use-locale'

export function FooterSection() {
  const {t} = useLocale()
  return (
    <Container bgColor="brand.secondary" maxW="full" py={10}>
      <SimpleGrid columns={[2, 5]} maxWidth="5xl" mx="auto">
        <VStack justifyContent="center" py={5}>
          <Image alt="" height={73} src="/img/logo_header.svg" width={80} />
          <Image
            alt=""
            height={24}
            src="/img/logo_header_text.svg"
            width={105}
          />
        </VStack>
        <VStack
          alignItems={['center', 'baseline']}
          color="gray.100"
          justifyContent="center"
          py={5}
        >
          <Link href="tel:+48792665092">+48792665092</Link>
          <Link href="mailto:t.yarosh@kinguru.io">t.yarosh@kinguru.io</Link>
        </VStack>
        <VStack
          alignItems={['center', 'baseline']}
          color="gray.100"
          justifyContent="center"
          py={5}
        >
          <Link href="https://www.facebook.com/kinguru.online/" isExternal>
            <FaFacebook style={{display: 'inline', fontSize: '13px'}} />{' '}
            facebook
          </Link>
          <Link href="https://www.linkedin.com/" isExternal>
            <FaLinkedin style={{display: 'inline', fontSize: '13px'}} />{' '}
            linkedin
          </Link>
          <Link href="https://www.instagram.com/kinguru.online/" isExternal>
            <FaInstagram style={{display: 'inline', fontSize: '13px'}} />{' '}
            instagram
          </Link>
        </VStack>
        <VStack
          alignItems={['center', 'baseline']}
          color="gray.100"
          justifyContent="center"
          py={5}
        >
          <Link href="/#events">{t('footer.upcoming_events')}</Link>
          <Link href="/#how_it_works">{t('footer.how_it_works')}</Link>
          <Link href="/#events">{t('footer.reviews')}</Link>
        </VStack>
        <VStack
          alignItems={['center', 'baseline']}
          color="gray.100"
          justifyContent="center"
          py={5}
        >
          <Link href="/privacy-policy">{t('footer.privacy_policy')}</Link>
          <Link href="/#">{t('footer.photo_reports')}</Link>
          <Link href="/#">{t('footer.contacts')}</Link>
        </VStack>
      </SimpleGrid>
    </Container>
  )
}
