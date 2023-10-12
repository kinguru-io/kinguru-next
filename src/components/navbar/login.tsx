import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import Link from 'next/link'
import {Session} from 'next-auth'
import {signIn, signOut} from 'next-auth/react'
import {useTranslations} from 'next-intl'

export function Login({session}: {session: Session | null}) {
  const t = useTranslations()
  const userNavigation = [
    {name: t('navbar.your_profile'), href: '/dashboard'},
    {name: t('navbar.settings'), href: '#'}
  ]

  return (
    <Flex alignItems="center">
      {session ? (
        <Menu>
          <MenuButton
            as={Button}
            cursor="pointer"
            minW={0}
            rounded="full"
            variant="link"
          >
            <Avatar size="sm" src={session?.user?.image ?? undefined} />
          </MenuButton>
          <MenuList>
            {userNavigation.map(({href, name}) => (
              <MenuItem key={href} as={Link} href={href}>
                {name}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={() => signOut()}>
              {t('navbar.sign_out')}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={() => signIn()}>{t('navbar.sign_in')}</Button>
      )}
    </Flex>
  )
}
