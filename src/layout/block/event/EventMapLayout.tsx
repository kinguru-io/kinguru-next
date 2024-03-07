import { Box, Container } from "~/styled-system/jsx";

export function EventMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgColor="neutral.5" paddingBlock="70px 110px">
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
