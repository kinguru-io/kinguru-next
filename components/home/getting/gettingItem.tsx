import { Container, Text } from "@chakra-ui/react";
import Image from "next/image";

export const GettingItem = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <Container maxWidth={"xs"} mt={10}>
      <Image
        src={image}
        width={100}
        height={100}
        style={{
          margin: "auto",
        }}
        alt={title}
      />
      <Text textAlign={"center"} mt={5}>
        {title}
      </Text>
    </Container>
  );
};
