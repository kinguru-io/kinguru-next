import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import Link from 'next/link'

export function SpeakerCard({
  speaker
}: {
  speaker: {
    id: string
    user: {
      image: string | null
      name: string | null
      position: string | null
      company: string | null
    }
  }
}) {
  return (
    <>
      <Center py={6}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="2xl"
          overflow="hidden"
          rounded="md"
          w="full"
        >
          <Image
            alt={speaker.user.name ?? 'Speaker'}
            h="120px"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            w="full"
          />
          <Flex justify="center" mt={-12}>
            <Avatar
              css={{
                border: '2px solid white'
              }}
              size="xl"
              src={speaker.user.image ?? undefined}
            />
          </Flex>

          <Box p={6}>
            <Stack align="center" mb={5} spacing={0}>
              <Heading
                as={Link}
                fontFamily="body"
                fontSize="2xl"
                fontWeight={500}
                href={`/speakers/${speaker.id}`}
                mb={5}
              >
                {speaker.user.name}
              </Heading>
              <Text color="gray.500">{speaker.user.position}</Text>
              <Text color="gray.500">{speaker.user.company}</Text>
            </Stack>

            <Stack direction="row" justify="center" spacing={6}>
              <Stack align="center" spacing={0}>
                <Text fontWeight={600}>23k</Text>
                <Text color="gray.500" fontSize="sm">
                  Followers
                </Text>
              </Stack>
              <Stack align="center" spacing={0}>
                <Text fontWeight={600}>23k</Text>
                <Text color="gray.500" fontSize="sm">
                  Followers
                </Text>
              </Stack>
            </Stack>

            <Button mt={8} variant="primary" w="full">
              Follow
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  )
}
