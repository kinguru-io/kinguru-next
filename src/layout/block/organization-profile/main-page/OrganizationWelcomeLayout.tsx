import { Box, Container, VStack } from "~/styled-system/jsx";

export function OrganizationWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box mb="75px">
      <Container>
        <section>
          <VStack gap="25px" w="100%">
            {children}
          </VStack>
        </section>
      </Container>
    </Box>
  );
}
