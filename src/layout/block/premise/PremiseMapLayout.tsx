import { Box, Container } from "~/styled-system/jsx";

export function PremiseMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgColor="neutral.5" paddingBlock="40px 130px">
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
