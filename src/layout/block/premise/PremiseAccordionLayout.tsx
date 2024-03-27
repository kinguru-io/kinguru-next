import { Container } from "~/styled-system/jsx";

export function PremiseAccordionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container paddingBlock="60px">
      <section>{children}</section>
    </Container>
  );
}
