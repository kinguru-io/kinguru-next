import { Box, Container, Flex } from "~/styled-system/jsx";

export function PremiseAttributesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box w="100%" bg="yellow.2">
      <Container paddingBlock="36px" maxW="4xl">
        <section>
          <Flex gap="45px">{children}</Flex>
        </section>
      </Container>
    </Box>
  );
}
