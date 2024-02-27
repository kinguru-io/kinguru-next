import { Box, Container } from "~/styled-system/jsx";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Box paddingBlock="83px 40px">{children}</Box>
    </Container>
  );
}
