import { Container, Text, HStack } from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";

export const WorksItem = ({
  title,
  last,
}: {
  title: string;
  last: boolean;
}) => {
  return (
    <HStack>
      <Container
        maxWidth={"sm"}
        bg={"brand.primary"}
        mr={[0, 2]}
        borderRadius={10}
      >
        <Text textAlign={"center"} my={7} mx={2}>
          {title}
        </Text>
      </Container>
      {!last && <BiRightArrowAlt size={32} />}
    </HStack>
  );
};
