import { PremiseFilter } from "./_filter";
import { Container, Grid } from "~/styled-system/jsx";

type MaybeArray<T> = T | T[];

const numericResolver = () => {};

const filterItemResolverMap = {
  amenities: (terms: MaybeArray<string>) => ({
    terms_set: {
      amenities: {
        terms: Array.isArray(terms) ? terms : [terms],
        minimum_should_match_script: { source: "params.num_terms" },
      },
    },
  }),
  type: (type: MaybeArray<string>) => ({
    terms: { type: Array.isArray(type) ? type : [type] },
  }),
};

export default async function PremiseListingPage() {
  return (
    <Container maxWidth="1920px">
      <Grid gap="50px" paddingBlock="70px" gridTemplateColumns="284px 1fr">
        <PremiseFilter />
      </Grid>
    </Container>
  );
}
