import { Container, VStack, Box } from "~/styled-system/jsx";

export function PremiseMainInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg="neutral.4" width="100%">
      <Container paddingBlock="60px 34px">
        <section>
          <VStack gap="30px">{children}</VStack>
        </section>
      </Container>
    </Box>
  );
}
