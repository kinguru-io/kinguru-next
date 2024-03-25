import { Container, VStack } from "~/styled-system/jsx";

export function PremiseAccordionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container paddingBlock="74px 152px">
      <section>
        <VStack w="100%" gap="15px">
          {children}
        </VStack>
      </section>
    </Container>
  );
}
