import {Container, Text} from '@chakra-ui/react'
import Image from 'next/image'

export function WorksItem({image, title}: {title: string; image: string}) {
  return (
    <Container maxWidth="xs" mt={10}>
      <Image
        alt={title}
        height={100}
        src={image}
        style={{
          margin: 'auto'
        }}
        width={100}
      />
      <Text mt={5} textAlign="center">
        {title}
      </Text>
    </Container>
  )
}
