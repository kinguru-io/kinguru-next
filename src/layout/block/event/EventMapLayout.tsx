import { Box, Container } from "~/styled-system/jsx";

export function EventMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgColor="light" paddingBlock="70px 110px">
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
