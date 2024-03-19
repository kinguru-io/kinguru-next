import { Container, Grid } from "~/styled-system/jsx";

export function OrganizationMainInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxW="5xl">
      <section>
        <Grid gridTemplate="repeat(3, 1fr) / repeat(3, 1fr)">{children}</Grid>
      </section>
    </Container>
  );
}
