import { Box, Container } from "~/styled-system/jsx";

export function VenueMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgColor="secondary.lighter" paddingBlock="40px 130px">
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
