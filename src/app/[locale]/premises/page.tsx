import { Suspense } from "react";
import { PremiseFilter } from "./_filter";
import { Listing } from "./_listing";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import {
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremiseSlider,
  PremiseTitle,
  Tag,
} from "@/components/uikit";
import { PremiseTags } from "@/components/uikit/PremiseCard/PremiseCard";
import { defaultSizings } from "@/lib/actions/premise-filter";
import { AspectRatio, Container, Grid, InlineBox } from "~/styled-system/jsx";

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
      <Container>
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
    <Grid gap="6" gridTemplateColumns={{ base: "1", sm: "2" }} aria-busy>
      {Array.from({ length: size }, (_, i) => (
        <PremiseCard key={i}>
          <PremiseTags>
            <Tag variant="solid" colorPalette="transparent" color="transparent">
              ...
            </Tag>
          </PremiseTags>
          <PremiseContent href="#" label="">
            <PremiseTitle>...</PremiseTitle>
            <PremiseDescription>
              <InlineBox display="inline-block" height="2lh" lineHeight="1.5" />
            </PremiseDescription>
          </PremiseContent>
          <PremiseSlider>
            <AspectRatio ratio={16 / 9} />
          </PremiseSlider>
        </PremiseCard>
      ))}
    </Grid>
  );
}
