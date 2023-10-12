import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Skeleton,
  Input
} from '@chakra-ui/react'
import {SearchBox} from '@elastic/react-search-ui'
import Link from 'next/link'
import {signIn, signOut, useSession} from 'next-auth/react'
import {FiChevronDown, FiMenu} from 'react-icons/fi'
import {useLocale} from 'utils/use-locale'

interface MobileProps extends FlexProps {
  onOpen(): void
}

export function NavSidebar({onOpen, ...rest}: MobileProps) {
  const {t} = useLocale()
  const {data: session, status} = useSession()
  const userNavigation = [
    {name: t('navbar.your_profile'), href: '/dashboard'},
    {name: t('navbar.settings'), href: '#'}
  ]

  return (
    <Flex
      alignItems="center"
      backdropBlur="8px"
      backdropFilter="auto"
      backgroundColor="rgba(255,255,255,.3)"
      height="20"
      justifyContent={{base: 'space-between', md: 'space-between'}}
      ml={{base: 0, md: 60}}
      position="fixed"
      px={{base: 4, md: 4}}
      w={['100%', 'calc(100% - var(--chakra-space-60))']}
      zIndex={100}
      {...rest}
    >
      <IconButton
        aria-label="open menu"
        display={{base: 'flex', md: 'none'}}
        icon={<FiMenu />}
        onClick={onOpen}
        variant="outline"
      />
      <SearchBox
        autocompleteSuggestions={false}
        debounceLength={0}
        inputView={({getInputProps}) => (
          <Input
            {...getInputProps({
              placeholder: t('navbar.search_placeholder')
            })}
            width={['auto', 'auto', 'auto', 'xl']}
          />
        )}
      />

      <HStack spacing={{base: '0', md: '6'}}>
        <Skeleton isLoaded={status !== 'loading'}>
          {status === 'authenticated' ? (
            <Flex alignItems="center">
              <Menu>
                <MenuButton
                  _focus={{boxShadow: 'none'}}
                  py={2}
                  transition="all 0.3s"
                >
                  <HStack>
                    <Avatar size="sm" src={session?.user?.image || undefined} />
                    <VStack
                      alignItems="flex-start"
                      display={{base: 'none', md: 'flex'}}
                      ml="2"
                      spacing="1px"
                    >
                      <Text fontSize="sm">{session?.user?.name}</Text>
                    </VStack>
                    <Box display={{base: 'none', md: 'flex'}}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList bg="white" borderColor="gray.200">
                  {userNavigation.map(({href, name}) => (
                    <MenuItem key={href} as={Link} href={href}>
                      {name}
                    </MenuItem>
                  ))}
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>
                    {t('navbar.sign_out')}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Button onClick={() => signIn()}>{t('navbar.sign_in')}</Button>
          )}
        </Skeleton>
      </HStack>
    </Flex>
  )
}
