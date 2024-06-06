import { PremiseFilter } from "./_filter";
import { Listing } from "./_listing";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import { Container, Grid } from "~/styled-system/jsx";

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  return (
    <>
      <TimeRangeHero>
        <TimeRangeLink
          pathname="/premises"
          flushBefore={["sort", "size"]}
          name="search_datetime"
        />
      </TimeRangeHero>
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
    </>
  );
}
