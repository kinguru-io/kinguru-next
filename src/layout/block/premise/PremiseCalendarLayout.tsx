import { Container, Box } from "~/styled-system/jsx";

export function PremiseCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg="neutral.4" width="100%">
      <Container paddingBlock="102px 87px">
        <section>{children}</section>
      </Container>
    </Box>
  );
}
