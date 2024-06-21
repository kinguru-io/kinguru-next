import { Box, Container } from "~/styled-system/jsx";

export function EventPopularEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box position="relative" paddingBlock="70px 110px" bg="secondary.lighter">
      <Container color="dark">
        <section>{children}</section>
      </Container>
    </Box>
  );
}
