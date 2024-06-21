import { Box, Container } from "~/styled-system/jsx";

export function PremiseMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgColor="light" paddingBlock="40px 130px">
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
