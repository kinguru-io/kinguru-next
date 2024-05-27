import { Container, Grid } from "~/styled-system/jsx";

export default function PremiseListingLayout({
  filter,
  listing,
}: {
  filter: React.ReactNode;
  listing: React.ReactNode;
}) {
  return (
    <Container maxWidth="1920px">
      <Grid gap="50px" paddingBlock="70px" gridTemplateColumns="284px 1fr">
        {filter}
        {listing}
      </Grid>
    </Container>
  );
}
