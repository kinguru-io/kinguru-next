import { Box, Container } from "~/styled-system/jsx";

export function EventPopularEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box position="relative" paddingBlock="70px 110px" bg="neutral.4">
      <Container color="neutral.1">
        <section>{children}</section>
      </Container>
    </Box>
  );
}
