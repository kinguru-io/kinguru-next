import { Suspense } from "react";
import { PremiseFilter } from "./_filter";
import { Listing } from "./_listing";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import {
  Button,
  DefaultImage,
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremiseSlider,
  PremiseTextContent,
  PremiseTitleWrapper,
} from "@/components/uikit";
import { defaultSizings } from "@/lib/actions/premise-filter";
import { AspectRatio, Container, Grid, Stack } from "~/styled-system/jsx";

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const sizeParam = searchParams?.size;
  const size =
    typeof sizeParam === "string" ? Number(sizeParam) : defaultSizings.size;

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
          <Suspense
            key={Object.values(searchParams).join()}
            fallback={<ListingSkeletons size={size} />}
          >
            <Listing searchParams={searchParams} />
          </Suspense>
        </Grid>
      </Container>
    </>
  );
}

function ListingSkeletons({ size }: { size: number }) {
  return (
    <Stack gap="20px">
      {Array.from({ length: size }, (_) => (
        <PremiseCard>
          <PremiseContent>
            <PremiseTextContent>
              <PremiseTitleWrapper>{""}</PremiseTitleWrapper>
              <PremiseDescription>{""}</PremiseDescription>
            </PremiseTextContent>
            <Button size="md" colorPalette="secondary" isLoading>
              Loading...
            </Button>
          </PremiseContent>
          <PremiseSlider>
            <AspectRatio ratio={16 / 9}>
              <DefaultImage />
            </AspectRatio>
          </PremiseSlider>
        </PremiseCard>
      ))}
    </Stack>
  );
}
