import { Container, VStack } from "~/styled-system/jsx";

export function PremiseMainInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container paddingBlock="60px 34px">
      <section>
        <VStack gap="30px">{children}</VStack>
      </section>
    </Container>
  );
}
