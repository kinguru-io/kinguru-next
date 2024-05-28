import { PremiseFilter } from "./_filter";
import { Listing } from "./_listing";
import { Container, Grid } from "~/styled-system/jsx";

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  return (
    <Container maxWidth="1920px">
      <Grid
        gap="50px"
        paddingBlock="70px"
        gridTemplateColumns={{ base: "1fr", md: "284px 1fr" }}
      >
        <PremiseFilter />
        <Listing searchParams={searchParams} />
      </Grid>
    </Container>
  );
}
