import {Box, useColorModeValue} from '@chakra-ui/react'
import {ReactNode} from 'react'

export function NavLink({children, href}: {href: string; children: ReactNode}) {
  return (
    <Box
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
      as="a"
      href={href}
      px={2}
      py={1}
      rounded="md"
    >
      {children}
    </Box>
  )
}
