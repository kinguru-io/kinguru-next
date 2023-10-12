import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react'
import Link from 'next/link'
import {Session} from 'next-auth'
import {useTranslations} from 'next-intl'
import {Login} from 'components/navbar/login'
import {NavLink} from 'components/navbar/navlink'

export function Navbar({
  full,
  session
}: {
  session: Session | null
  full?: boolean
}) {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const t = useTranslations()
  const navigation = [
    {name: t('navbar.events'), href: '/events'},
    {name: t('navbar.speakers'), href: '/speakers'},
    {name: t('navbar.places'), href: '/places'}
  ]

  return (
    <>
      <Box
        backdropFilter="saturate(180%) blur(5px)"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottom="1px"
        borderBottomColor="gray.200"
        position="fixed"
        px={4}
        w="100vw"
        zIndex={100}
      >
        <Flex
          alignItems="center"
          h={16}
          justifyContent="space-between"
          marginX="auto"
          maxWidth={full ? 'full' : '4xl'}
        >
          <IconButton
            aria-label={t('navbar.open_main_menu')}
            display={{md: 'none'}}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            size="md"
          />
          <HStack alignItems="center" spacing={8}>
            <Box as={Link} href="/">
              <Image src="/img/logo_header.png" width={24} />
            </Box>
            <HStack as="nav" display={{base: 'none', md: 'flex'}} spacing={4}>
              {navigation.map(({href, name}) => (
                <NavLink key={href} href={href}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Login session={session} />
        </Flex>

        {isOpen ? (
          <Box display={{md: 'none'}} pb={4}>
            <Stack as="nav" spacing={4}>
              {navigation.map(({href, name}) => (
                <NavLink key={href} href={href}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
